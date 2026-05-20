import nodemailer from "nodemailer";
import type { OrderRecord } from "@/lib/order-types";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function money(amount: number) {
  return `NPR ${amount.toLocaleString("en-NP")}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string | number) {
  return `
    <tr>
      <td style="padding:10px 0;color:#7b6b66;font-size:13px;">${label}</td>
      <td style="padding:10px 0;color:#282220;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(String(value))}</td>
    </tr>
  `;
}

function emailShell(brand: string, content: string) {
  return `
    <div style="margin:0;padding:0;background:#fff8f6;font-family:Arial,Helvetica,sans-serif;color:#282220;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff8f6;padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #f9d6ce;">
              <tr>
                <td style="padding:28px 28px 20px;background:#282220;color:#ffffff;">
                  <div style="font-size:26px;font-weight:800;letter-spacing:0;">${escapeHtml(brand)}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:28px;">
                  ${content}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function businessEmailTemplate(order: OrderRecord, brand: string) {
  return emailShell(
    brand,
    `
      <div style="display:inline-block;background:#fdece7;color:#ad493a;border-radius:999px;padding:8px 12px;font-size:12px;font-weight:800;">${order.orderStatus}</div>
      <h1 style="margin:18px 0 8px;font-size:28px;line-height:1.2;color:#282220;">New product order received</h1>
      <p style="margin:0 0 22px;color:#7b6b66;line-height:1.6;">Please call the customer soon to confirm this order.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid #f3ddd7;border-bottom:1px solid #f3ddd7;">
        ${row("Order ID", order.orderId)}
        ${row("Date & Time", order.dateTime)}
      </table>
      <h2 style="margin:24px 0 8px;font-size:18px;color:#282220;">Customer details</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${row("Customer Name", order.name)}${row("Phone Number", order.phone)}${row("Email Address", order.email)}${row("Exact Location", order.location)}</table>
      <h2 style="margin:24px 0 8px;font-size:18px;color:#282220;">Product details</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${row("Product Name", order.productName)}${row("Quantity", order.quantity)}${row("Price Per Piece", money(order.pricePerPiece))}${row("Total Price", money(order.totalPrice))}</table>
      <h2 style="margin:24px 0 8px;font-size:18px;color:#282220;">Payment details</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${row("Payment Method", order.paymentMethod)}${row("Order Status", order.orderStatus)}</table>
      <div style="margin-top:24px;background:#fff8f6;border:1px solid #f9d6ce;border-radius:18px;padding:18px;color:#8f392e;font-weight:800;">
        Please call the customer soon to confirm this order.
      </div>
    `
  );
}

function customerEmailTemplate(order: OrderRecord, brand: string, supportEmail: string) {
  return emailShell(
    brand,
    `
      <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;color:#282220;">Thank you for your order.</h1>
      <p style="margin:0 0 18px;color:#7b6b66;line-height:1.7;">Hi ${escapeHtml(order.name)}, we have received your order successfully.</p>
      <div style="background:#fff8f6;border:1px solid #f9d6ce;border-radius:18px;padding:18px;margin:22px 0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          ${row("Order ID", order.orderId)}
          ${row("Product", order.productName)}
          ${row("Quantity", order.quantity)}
          ${row("Total Price", money(order.totalPrice))}
          ${row("Payment Method", order.paymentMethod)}
        </table>
      </div>
      <p style="margin:0 0 18px;color:#282220;line-height:1.7;font-weight:700;">Our sales representative will call you soon to confirm your order.</p>
      <p style="margin:0;color:#7b6b66;line-height:1.7;">For support, reply to this email or contact ${escapeHtml(supportEmail)}.</p>
      <p style="margin:22px 0 0;color:#282220;line-height:1.7;">Thank you,<br><strong>${escapeHtml(brand)}</strong></p>
    `
  );
}

export async function sendOrderEmails(order: OrderRecord) {
  const businessEmail = requireEnv("BUSINESS_EMAIL");
  const emailFrom = requireEnv("EMAIL_FROM");
  const brand = process.env.BRAND_NAME || "StyleNest";
  const smtpHost = requireEnv("SMTP_HOST");
  const smtpPort = Number(requireEnv("SMTP_PORT"));
  const smtpUser = requireEnv("SMTP_USER");
  const smtpPass = requireEnv("SMTP_PASS");

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  await transporter.sendMail({
    from: `"${brand}" <${emailFrom}>`,
    to: businessEmail,
    replyTo: order.email,
    subject: `New Product Order Received - ${order.orderId}`,
    html: businessEmailTemplate(order, brand)
  });

  await transporter.sendMail({
    from: `"${brand}" <${emailFrom}>`,
    to: order.email,
    replyTo: emailFrom,
    subject: `Your Order Has Been Received - ${brand}`,
    html: customerEmailTemplate(order, brand, emailFrom)
  });
}
