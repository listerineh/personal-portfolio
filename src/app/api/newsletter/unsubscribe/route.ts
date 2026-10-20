import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { FROM } from "@/lib/email/layout";
import { unsubscribeLinkEmail } from "@/lib/email/templates";
import {
  clientIp,
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

    const { subject, html, text } = unsubscribeLinkEmail({ lang: isEs ? "es" : "en", unsubscribeUrl: links.page });
    await resend.emails.send({ from: FROM, to: email, subject, html, text });
  } catch (error) {
    console.error("[unsubscribe] confirmation link", error);
  }
}
