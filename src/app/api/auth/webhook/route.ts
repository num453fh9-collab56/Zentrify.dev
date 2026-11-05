import { NextRequest } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, record } = body;

    if (type !== "INSERT") return Response.json({ ok: true });

    const email = record?.email || "Unknown";
    const name =
      record?.raw_user_meta_data?.full_name ||
      record?.raw_user_meta_data?.name ||
      "No name";
    const provider =
      record?.raw_app_meta_data?.provider || "email";
    const createdAt = record?.created_at || new Date().toISOString();

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) return Response.json({ ok: true });

    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "Zentrify <onboarding@resend.dev>",
      to: "num453fh9@gmail.com",
      subject: `New signup: ${email} (${provider})`,
      text: [
        `New user signed up on Zentrify`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Provider: ${provider}`,
        `Signed up: ${createdAt}`,
      ].join("\n"),
    }).catch(() => {});

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: true });
  }
}
