import nodemailer from "nodemailer";

/**
 * Send an email notification to the site owner.
 * Follows the Billionaire PLC SMTP skill contract:
 * - STARTTLS on port 587 (secure: false, requireTLS: true)
 * - Supports both SMTP_USERNAME/SMTP_PASSWORD and SMTP_USER/SMTP_PASS aliases
 * - All env vars read lazily at call time
 */

// Lazy singleton transport — one per process
let _transport: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransport() {
  // Always use Office 365 SMTP (GoDaddy email) — ignore SMTP_HOST env var which may be set
  // incorrectly to smtp.hostinger.com on Hostinger's Node.js environment
  const host = "smtp.office365.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USERNAME || process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || "";

  if (!_transport) {
    _transport = nodemailer.createTransport({
      host,
      port,
      secure: false,       // STARTTLS — not SSL
      requireTLS: true,    // Enforce TLS upgrade (required for Office 365)
      auth: { user, pass },
      tls: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  return { transport: _transport, user, pass, host, port };
}

export async function sendOwnerEmail(subject: string, body: string): Promise<void> {
  const { transport, user, pass, host, port } = getTransport();
  const fromEmail = process.env.SMTP_FROM_EMAIL || user;
  const toEmail = process.env.SMTP_TO_EMAIL || process.env.NOTIFY_EMAIL || user;

  console.log(`[Email] Attempting: "${subject}" via ${host}:${port} from ${fromEmail} to ${toEmail}`);

  if (!pass) {
    console.warn("[Email] SMTP password not configured (SMTP_PASSWORD or SMTP_PASS) — skipping.");
    return;
  }

  if (!user) {
    console.warn("[Email] SMTP username not configured (SMTP_USERNAME or SMTP_USER) — skipping.");
    return;
  }

  try {
    await transport.verify();
    console.log("[Email] SMTP handshake verified");

    const plainBody = body.replace(/\*\*(.*?)\*\*/g, "$1");
    const htmlBody = body
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#000;color:#fff;font-family:Georgia,serif;padding:32px;">
  <div style="max-width:600px;margin:0 auto;border:1px solid #C9A84C;padding:32px;">
    <h2 style="color:#C9A84C;margin-top:0;">${subject}</h2>
    <div style="line-height:1.8;">${htmlBody}</div>
    <hr style="border-color:#C9A84C;margin-top:32px;">
    <p style="color:#666;font-size:12px;">
      Billionaire Collection — <a href="https://billionairecollection.com" style="color:#C9A84C;">billionairecollection.com</a>
    </p>
  </div>
</body>
</html>`;

    await transport.sendMail({
      from: `"Billionaire Collection" <${fromEmail}>`,
      to: toEmail,
      subject: `[BC] ${subject}`,
      text: plainBody,
      html,
    });

    console.log(`[Email] Sent: ${subject}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    // Reset transport so next call gets a fresh connection
    _transport = null;
    console.error(`[Email] Failed: ${msg}`);
  }
}
