import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  clientIp,
  escapeHtml,
  isValidEmail,
  unsubscribeLinks,
  verifyUnsubscribeToken,
  withinRateLimit,
} from "@/lib/server/security";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY);
const resendHeaders = () => ({
  Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  "Content-Type": "application/json",
});

/**
 * Two ways in, both proving the request comes from the mailbox:
 * - { email, token }: the signed link from a newsletter email (the /unsubscribe page posts it after a confirm click),
 *   or a mail client's RFC 8058 one-click POST with email and token in the query string.
 * - { email } alone: emails a signed link to that address. The answer is the same whether or not it is subscribed,
 *   so the endpoint never reveals who is on the list.
 */
export async function POST(request: NextRequest) {
  if (
    !(await withinRateLimit(`unsubscribe:${clientIp(request)}`, 10, 60 * 60))
  ) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const query = request.nextUrl.searchParams;
  const body: { email?: unknown; token?: unknown; locale?: unknown } =
    request.headers.get("content-type")?.includes("application/json")
      ? await request.json().catch(() => ({}))
      : {};
  const email = query.get("email") ?? body.email;
  const token = query.get("token") ?? body.token;
  const isEs = body.locale === "es";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  if (typeof token === "string" && token) {
    if (!(await verifyUnsubscribeToken(email, token))) {
      return NextResponse.json({ error: "invalid-link" }, { status: 400 });
    }
    return unsubscribe(email);
  }

  await sendConfirmationLink(email, isEs);
  return NextResponse.json({ message: "link-sent" }, { status: 200 });
}

async function unsubscribe(email: string) {
  try {
    const response = await fetch(
      `https://api.resend.com/contacts/${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        headers: resendHeaders(),
        body: JSON.stringify({ unsubscribed: true }),
      },
    );
    // Not on the list is the outcome they asked for anyway.
    if (!response.ok && response.status !== 404) {
      console.error("[unsubscribe] Resend status", response.status);
      return NextResponse.json(
        { error: "Failed to unsubscribe. Please try again." },
        { status: 500 },
      );
    }
    return NextResponse.json({ message: "unsubscribed" }, { status: 200 });
  } catch (error) {
    console.error("[unsubscribe]", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe. Please try again." },
      { status: 500 },
    );
  }
}

async function sendConfirmationLink(email: string, isEs: boolean) {
  try {
    // Only people on the list get a link; everyone gets the same answer.
    const contact = await fetch(
      `https://api.resend.com/contacts/${encodeURIComponent(email)}`,
      {
        headers: resendHeaders(),
      },
    );
    if (!contact.ok) return;
    const links = await unsubscribeLinks(email);
    if (!links) return;

    const href = escapeHtml(links.page);
    await resend.emails.send({
      from: "Sebastian Alvarez <hello@listerineh.dev>",
      to: email,
      subject: isEs
        ? "Confirma tu baja del newsletter"
        : "Confirm you want to unsubscribe",
      html: `<!DOCTYPE html><html lang="${isEs ? "es" : "en"}"><body style="margin:0;padding:32px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f7;color:#1d1d1f;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:22px;padding:32px;">
<tr><td>
<h1 style="margin:0 0 12px;font-size:22px;">${isEs ? "¿Te das de baja?" : "Unsubscribe?"}</h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#6e6e73;">${
        isEs
          ? "Alguien pidió dar de baja esta dirección del newsletter de listerineh.dev. Si fuiste tú, confirma con el botón. Si no, ignora este correo."
          : "Someone asked to remove this address from the listerineh.dev newsletter. If it was you, confirm with the button. If not, ignore this email."
      }</p>
<a href="${href}" style="display:inline-block;padding:12px 24px;border-radius:999px;background:#d97706;color:#1d1d1f;font-weight:600;text-decoration:none;">${
        isEs ? "Confirmar baja" : "Confirm unsubscribe"
      }</a>
</td></tr></table></td></tr></table></body></html>`,
    });
  } catch (error) {
    console.error("[unsubscribe] confirmation link", error);
  }
}
