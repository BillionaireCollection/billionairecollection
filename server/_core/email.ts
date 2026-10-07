import nodemailer from "nodemailer";

/**
 * Server-only Billionaire PLC owner-email delivery.
 * Uses Microsoft 365 STARTTLS and returns a safe delivery outcome without
 * exposing credentials, recipient addresses, SMTP responses, or raw errors.
 */

export type OwnerEmailDelivery = {
  delivered: boolean;
  status: "sent" | "failed";
};

type OwnerEmailOptions = {
  replyTo?: string;
};

let transport: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransport() {
  const host = "smtp.office365.com";
  const port = Number.parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USERNAME || process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || "";

  if (!transport) {
    transport = nodemailer.createTransport({
      host,
      port,
      secure: false,
      requireTLS: true,
      auth: { user, pass },
      tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }

  return { transport, user, pass };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normaliseSubject(subject: string) {
  return subject.replace(/[\r\n]+/g, " ").trim().slice(0, 180);
}

/**
 * Sends a bounded, server-side owner notification. A failed delivery is
 * intentionally non-throwing so callers can preserve the submitted enquiry.
 */
export async function sendOwnerEmail(
  subject: string,
  body: string,
  options: OwnerEmailOptions = {},
): Promise<OwnerEmailDelivery> {
  const { transport: smtpTransport, user, pass } = getTransport();
  const fromEmail = process.env.SMTP_FROM_EMAIL || user;
  const toEmail = process.env.SMTP_TO_EMAIL || process.env.NOTIFY_EMAIL || user;

  if (!user || !pass || !fromEmail || !toEmail) {
    console.warn("[Email] Owner notification skipped: SMTP configuration is incomplete.");
    return { delivered: false, status: "failed" };
  }

  try {
    await smtpTransport.verify();

    const safeSubject = normaliseSubject(subject);
    const plainBody = body.replace(/\*\*(.*?)\*\*/g, "$1");
    const htmlBody = escapeHtml(body)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");

    await smtpTransport.sendMail({
      from: `"Billionaire Collection" <${fromEmail}>`,
      to: toEmail,
      replyTo: options.replyTo,
      subject: `[BC] ${safeSubject}`,
      text: plainBody,
      html: `<!doctype html><html><head><meta charset="utf-8"></head><body style="background:#000;color:#fff;font-family:Georgia,serif;padding:32px;"><div style="max-width:600px;margin:0 auto;border:1px solid #C9A84C;padding:32px;"><h2 style="color:#C9A84C;margin-top:0;">${escapeHtml(safeSubject)}</h2><div style="line-height:1.8;">${htmlBody}</div><hr style="border-color:#C9A84C;margin-top:32px;"><p style="color:#888;font-size:12px;">Billionaire Collection — billionairecollection.com</p></div></body></html>`,
    });

    console.info("[Email] Owner notification delivered.");
    return { delivered: true, status: "sent" };
  } catch {
    transport = null;
    console.warn("[Email] Owner notification delivery failed.");
    return { delivered: false, status: "failed" };
  }
}
