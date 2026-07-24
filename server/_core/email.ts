import nodemailer from "nodemailer";

/**
 * Send an email notification to the site owner.
 * All env vars are read lazily (at call time) so dotenv has already loaded them.
 */
export async function sendOwnerEmail(subject: string, body: string): Promise<void> {
  const SMTP_HOST = process.env.SMTP_HOST || "smtp.office365.com";
  const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
  const SMTP_USER = process.env.SMTP_USER || "";
  const SMTP_PASS = process.env.SMTP_PASS || "";
  const NOTIFY_TO = process.env.NOTIFY_EMAIL || SMTP_USER;

  if (!SMTP_PASS) {
    console.warn("[Email] SMTP_PASS not configured — skipping notification.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // STARTTLS on port 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

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

    await transporter.sendMail({
      from: `"Billionaire Collection" <${SMTP_USER}>`,
      to: NOTIFY_TO,
      subject: `[BC] ${subject}`,
      text: plainBody,
      html,
    });

    console.log(`[Email] Notification sent: ${subject}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[Email] Failed to send notification: ${msg}`);
  }
}
