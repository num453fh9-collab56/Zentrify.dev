import { NextRequest } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { email, name, provider } = await req.json();
    if (!email) return Response.json({ ok: true });

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) return Response.json({ ok: true });

    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "Zentrify <onboarding@resend.dev>",
      to: "num453fh9@gmail.com",
      subject: `New signup: ${email} (${provider || "email"})`,
      text: [
        `New user signed up on Zentrify`,
        ``,
        `Name: ${name || "No name"}`,
        `Email: ${email}`,
        `Provider: ${provider || "email"}`,
        `Signed up: ${new Date().toISOString()}`,
      ].join("\n"),
    }).catch(() => {});

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: true });
  }
}
