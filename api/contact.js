import {
  EmailValidationError,
  verifySenderEmail,
} from "../server/emailVerification.js";

const serverEnv = globalThis.process?.env || {};
const FORM_SUBMIT_TOKEN =
  serverEnv.FORM_SUBMIT_TOKEN || "f99ffeea05f1fae6c6db04b333508e19";
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORM_SUBMIT_TOKEN}`;
const DEFAULT_LOCAL_ORIGIN = "http://localhost:5173";

class ContactRequestError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "ContactRequestError";
    this.statusCode = statusCode;
  }
}

class ContactDeliveryError extends Error {
  constructor(message) {
    super(message);
    this.name = "ContactDeliveryError";
    this.statusCode = 502;
  }
}

const parseRequestBody = (body = {}) => {
  if (typeof body !== "string") {
    return body || {};
  }

  try {
    return JSON.parse(body);
  } catch {
    return Object.fromEntries(new URLSearchParams(body));
  }
};

const sanitizeContactPayload = (body) => ({
  name: String(body.name || "").trim(),
  email: String(body.email || "").trim(),
  subject: String(body.subject || "").trim(),
  message: String(body.message || "").trim(),
  honeypot: String(body._honey || "").trim(),
});

const assertContactPayload = ({ name, message }) => {
  if (!name || !message) {
    throw new ContactRequestError("Please fill in your name and message.");
  }
};

const buildFormSubmitPayload = ({ name, email, subject, message }) => ({
  name,
  email,
  subject: subject || "Portfolio contact message",
  message,
  _replyto: email,
  _subject: subject
    ? `${subject} - Portfolio message from ${name}`
    : `New portfolio message from ${name}`,
  _captcha: "false",
  _template: "table",
  _honey: "",
});

const getHeaderValue = (headers = {}, name) => {
  const value = headers[name] ?? headers[name.toLowerCase()];

  if (Array.isArray(value)) {
    return String(value[0] || "").trim();
  }

  return String(value || "")
    .split(",")[0]
    .trim();
};

const normalizeOrigin = (value) => {
  const origin = String(value || "").trim();

  if (!origin) {
    return "";
  }

  try {
    return new URL(origin).origin;
  } catch {
    return origin.replace(/\/+$/, "");
  }
};

const getRequestOrigin = (headers = {}) => {
  const configuredOrigin = normalizeOrigin(serverEnv.FORM_SUBMIT_SITE_ORIGIN);

  if (configuredOrigin) {
    return configuredOrigin;
  }

  const origin = normalizeOrigin(getHeaderValue(headers, "origin"));

  if (origin) {
    return origin;
  }

  const refererOrigin = normalizeOrigin(getHeaderValue(headers, "referer"));

  if (refererOrigin) {
    return refererOrigin;
  }

  const host =
    getHeaderValue(headers, "x-forwarded-host") || getHeaderValue(headers, "host");

  if (!host) {
    return DEFAULT_LOCAL_ORIGIN;
  }

  const forwardedProto = getHeaderValue(headers, "x-forwarded-proto");
  const protocol =
    forwardedProto ||
    (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");

  return normalizeOrigin(`${protocol}://${host}`);
};

const buildFormSubmitHeaders = (requestHeaders) => {
  const origin = getRequestOrigin(requestHeaders);

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Origin: origin,
    Referer: `${origin}/`,
  };
};

const forwardToFormSubmit = async (payload, requestHeaders) => {
  const response = await fetch(FORM_SUBMIT_ENDPOINT, {
    method: "POST",
    headers: buildFormSubmitHeaders(requestHeaders),
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  const isAccepted =
    response.ok && (data.success === true || data.success === "true");

  if (!isAccepted) {
    throw new ContactDeliveryError(
      data.message || "Unable to send the message right now.",
    );
  }
};

const sendJson = (res, statusCode, payload) => {
  res.status(statusCode).json(payload);
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendJson(res, 405, {
      success: false,
      message: "Method not allowed.",
    });
    return;
  }

  try {
    const body = parseRequestBody(req.body);
    const contactPayload = sanitizeContactPayload(body);

    if (contactPayload.honeypot) {
      sendJson(res, 200, { success: true });
      return;
    }

    assertContactPayload(contactPayload);
    await verifySenderEmail(contactPayload.email);
    await forwardToFormSubmit(buildFormSubmitPayload(contactPayload), req.headers);

    sendJson(res, 200, {
      success: true,
      message: "Message sent.",
    });
  } catch (error) {
    if (error instanceof EmailValidationError) {
      sendJson(res, error.statusCode, {
        success: false,
        error: {
          code: error.code,
          field: error.field,
          message: error.message,
        },
      });
      return;
    }

    if (error instanceof ContactRequestError) {
      sendJson(res, error.statusCode, {
        success: false,
        message: error.message,
      });
      return;
    }

    if (error instanceof ContactDeliveryError) {
      sendJson(res, error.statusCode, {
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Contact API failed:", error);
    sendJson(res, error.statusCode || 500, {
      success: false,
      message: "Unable to send the message right now.",
    });
  }
}
