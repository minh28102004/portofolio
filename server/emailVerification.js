import { resolveMx } from "node:dns/promises";
import {
  EMAIL_VALIDATION_ERROR_CODES,
  EMAIL_VALIDATION_ERROR_MESSAGES,
  validateSenderEmailSyntax,
} from "../src/utils/emailValidation.js";

const DOMAIN_NOT_FOUND_CODES = new Set(["ENOTFOUND", "EINVAL"]);
const UNDELIVERABLE_DNS_CODES = new Set([
  "ENODATA",
  "ENOTIMP",
  "ESERVFAIL",
  "ETIMEOUT",
]);

export class EmailValidationError extends Error {
  constructor(code) {
    super(EMAIL_VALIDATION_ERROR_MESSAGES[code]);
    this.name = "EmailValidationError";
    this.code = code;
    this.field = "email";
    this.statusCode = 400;
  }
}

const throwEmailValidationError = (code) => {
  throw new EmailValidationError(code);
};

const createAbstractApiProvider = (apiKey, fetchImpl) => ({
  name: "abstract",
  verify: async (email) => {
    const url = new URL("https://emailvalidation.abstractapi.com/v1/");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("email", email);

    const response = await fetchImpl(url);
    const data = await response.json();

    return {
      isValid:
        response.ok &&
        data.deliverability === "DELIVERABLE" &&
        data.is_valid_format?.value !== false &&
        data.is_smtp_valid?.value !== false,
    };
  },
});

const createZeroBounceProvider = (apiKey, fetchImpl) => ({
  name: "zerobounce",
  verify: async (email) => {
    const url = new URL("https://api.zerobounce.net/v2/validate");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("email", email);

    const response = await fetchImpl(url);
    const data = await response.json();

    return {
      isValid: response.ok && data.status === "valid",
    };
  },
});

const getConfiguredEmailProvider = (env, fetchImpl) => {
  const providerName = env.EMAIL_VERIFICATION_PROVIDER?.toLowerCase();

  if (!providerName) {
    return null;
  }

  if (["abstract", "abstractapi"].includes(providerName)) {
    const apiKey = env.ABSTRACT_EMAIL_VALIDATION_API_KEY;

    if (!apiKey) {
      throw new Error("Missing ABSTRACT_EMAIL_VALIDATION_API_KEY.");
    }

    return createAbstractApiProvider(apiKey, fetchImpl);
  }

  if (providerName === "zerobounce") {
    const apiKey = env.ZEROBOUNCE_API_KEY;

    if (!apiKey) {
      throw new Error("Missing ZEROBOUNCE_API_KEY.");
    }

    return createZeroBounceProvider(apiKey, fetchImpl);
  }

  throw new Error(`Unsupported email verification provider: ${providerName}`);
};

const assertDomainHasMxRecord = async (domain, resolver) => {
  try {
    const mxRecords = await resolver(domain);
    const usableMxRecords = Array.isArray(mxRecords)
      ? mxRecords.filter((record) => record.exchange && record.exchange !== ".")
      : [];

    if (usableMxRecords.length === 0) {
      throwEmailValidationError(EMAIL_VALIDATION_ERROR_CODES.UNDELIVERABLE);
    }
  } catch (error) {
    if (error instanceof EmailValidationError) {
      throw error;
    }

    if (DOMAIN_NOT_FOUND_CODES.has(error.code)) {
      throwEmailValidationError(EMAIL_VALIDATION_ERROR_CODES.INVALID_DOMAIN);
    }

    if (UNDELIVERABLE_DNS_CODES.has(error.code)) {
      throwEmailValidationError(EMAIL_VALIDATION_ERROR_CODES.UNDELIVERABLE);
    }

    throwEmailValidationError(EMAIL_VALIDATION_ERROR_CODES.UNDELIVERABLE);
  }
};

const assertProviderAcceptsEmail = async (email, env, fetchImpl) => {
  const provider = getConfiguredEmailProvider(env, fetchImpl);

  if (!provider) {
    return;
  }

  let result;

  try {
    result = await provider.verify(email);
  } catch {
    throwEmailValidationError(EMAIL_VALIDATION_ERROR_CODES.UNDELIVERABLE);
  }

  if (!result.isValid) {
    throwEmailValidationError(EMAIL_VALIDATION_ERROR_CODES.UNDELIVERABLE);
  }
};

export const verifySenderEmail = async (
  email,
  {
    resolver = resolveMx,
    env = globalThis.process?.env || {},
    fetchImpl = fetch,
  } = {},
) => {
  const syntaxResult = validateSenderEmailSyntax(email);

  if (!syntaxResult.isValid) {
    throwEmailValidationError(syntaxResult.code);
  }

  await assertDomainHasMxRecord(syntaxResult.domain, resolver);
  await assertProviderAcceptsEmail(syntaxResult.email, env, fetchImpl);

  return {
    email: syntaxResult.email,
    domain: syntaxResult.domain,
  };
};
