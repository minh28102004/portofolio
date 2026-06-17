export const EMAIL_VALIDATION_ERROR_CODES = Object.freeze({
  INVALID_FORMAT: "INVALID_EMAIL_FORMAT",
  INVALID_DOMAIN: "INVALID_EMAIL_DOMAIN",
  UNDELIVERABLE: "UNDELIVERABLE_EMAIL",
});

export const EMAIL_VALIDATION_ERROR_MESSAGES = Object.freeze({
  [EMAIL_VALIDATION_ERROR_CODES.INVALID_FORMAT]: "Invalid email format.",
  [EMAIL_VALIDATION_ERROR_CODES.INVALID_DOMAIN]: "Email domain is invalid.",
  [EMAIL_VALIDATION_ERROR_CODES.UNDELIVERABLE]:
    "Email address does not exist or cannot receive emails.",
});

const MAX_EMAIL_LENGTH = 254;
const MAX_LOCAL_PART_LENGTH = 64;
const MAX_DOMAIN_LENGTH = 253;
const LOCAL_PART_PATTERN =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN_LABEL_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;
const TLD_PATTERN = /^[A-Za-z]{2,63}$/;

const invalidEmailResult = (code) => ({
  isValid: false,
  code,
  message: EMAIL_VALIDATION_ERROR_MESSAGES[code],
});

export const validateEmailFormat = (email) => {
  const value = String(email || "").trim();

  if (!value || value.length > MAX_EMAIL_LENGTH || /\s/.test(value)) {
    return invalidEmailResult(EMAIL_VALIDATION_ERROR_CODES.INVALID_FORMAT);
  }

  const parts = value.split("@");

  if (parts.length !== 2) {
    return invalidEmailResult(EMAIL_VALIDATION_ERROR_CODES.INVALID_FORMAT);
  }

  const [localPart, domain] = parts;

  if (
    !localPart ||
    !domain ||
    localPart.length > MAX_LOCAL_PART_LENGTH ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..") ||
    !LOCAL_PART_PATTERN.test(localPart)
  ) {
    return invalidEmailResult(EMAIL_VALIDATION_ERROR_CODES.INVALID_FORMAT);
  }

  return {
    isValid: true,
    email: value,
    localPart,
    domain: domain.toLowerCase(),
  };
};

export const validateEmailDomain = (domain) => {
  const value = String(domain || "").trim().toLowerCase();

  if (
    !value ||
    value.length > MAX_DOMAIN_LENGTH ||
    value.startsWith(".") ||
    value.endsWith(".") ||
    value.includes("..")
  ) {
    return invalidEmailResult(EMAIL_VALIDATION_ERROR_CODES.INVALID_DOMAIN);
  }

  const labels = value.split(".");
  const tld = labels[labels.length - 1];

  if (
    labels.length < 2 ||
    !TLD_PATTERN.test(tld) ||
    labels.some((label) => !DOMAIN_LABEL_PATTERN.test(label))
  ) {
    return invalidEmailResult(EMAIL_VALIDATION_ERROR_CODES.INVALID_DOMAIN);
  }

  return {
    isValid: true,
    domain: value,
  };
};

export const validateSenderEmailSyntax = (email) => {
  const formatResult = validateEmailFormat(email);

  if (!formatResult.isValid) {
    return formatResult;
  }

  const domainResult = validateEmailDomain(formatResult.domain);

  if (!domainResult.isValid) {
    return domainResult;
  }

  return {
    isValid: true,
    email: formatResult.email,
    localPart: formatResult.localPart,
    domain: domainResult.domain,
  };
};
