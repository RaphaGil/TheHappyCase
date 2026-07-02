const UNVERIFIED_PERSONAL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
];

const DEFAULT_REPLY_TO = "thehappycase.shop@gmail.com";

function stripUrlToHost(value) {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.includes("@")) return null;
  const match = trimmed.match(/^(?:https?:\/\/)?([^/:]+)/i);
  const host = match?.[1]?.toLowerCase();
  if (!host || host === "localhost" || host.startsWith("127.0.0.1")) return null;
  return host;
}

function getVerifiedSendingDomain() {
  const explicit = process.env.RESEND_DOMAIN || process.env.CUSTOM_DOMAIN;
  const fromExplicit = stripUrlToHost(explicit);
  if (fromExplicit) return fromExplicit;

  const urlCandidates = [
    process.env.FRONTEND_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VITE_SITE_URL,
    process.env.URL,
  ];

  for (const candidate of urlCandidates) {
    const host = stripUrlToHost(candidate);
    if (host) return host;
  }

  return "thehappycase.store";
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function extractEmailAddress(rawFrom) {
  if (!rawFrom || typeof rawFrom !== "string") return null;
  const trimmed = rawFrom.trim();
  if (!trimmed || trimmed.includes("${")) return null;
  const wrapped = trimmed.match(/<([^>]+)>/);
  const email = (wrapped?.[1] || trimmed).trim();
  return isValidEmail(email) ? email : null;
}

function getProductionDefaultEmail() {
  const verifiedDomain = getVerifiedSendingDomain() || "thehappycase.store";
  const localPart = (process.env.FROM_EMAIL_LOCAL_PART || "orders").trim() || "orders";
  return `${localPart}@${verifiedDomain}`;
}

function getResendFromEmail() {
  if (process.env.RESEND_USE_TEST_FROM === "true") {
    return "onboarding@resend.dev";
  }

  const productionDefault = getProductionDefaultEmail();
  const configured = extractEmailAddress(process.env.FROM_EMAIL);
  if (!configured) return productionDefault;

  const domain = configured.split("@")[1]?.toLowerCase();
  if (!domain) return productionDefault;

  if (domain === "resend.dev") return configured;
  if (UNVERIFIED_PERSONAL_DOMAINS.includes(domain)) return productionDefault;

  return configured;
}

function getResendReplyToEmail() {
  const configured = extractEmailAddress(process.env.REPLY_TO_EMAIL);
  if (configured) return configured;
  return DEFAULT_REPLY_TO;
}

module.exports = { getResendFromEmail, getResendReplyToEmail };
