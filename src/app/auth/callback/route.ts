import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { flowType: "pkce" },
    });
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    if (data?.user) {
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const resend = new Resend(resendKey);
        const name =
          data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          "No name";
        const provider =
          data.user.app_metadata?.provider || "google";
        const createdAt = new Date(data.user.created_at).getTime();
        const isNewUser = Date.now() - createdAt < 60_000;

        await resend.emails.send({
          from: "Zentrify <onboarding@resend.dev>",
          to: "num453fh9@gmail.com",
          subject: isNewUser
            ? `New signup: ${data.user.email} (${provider})`
            : `User login: ${data.user.email} (${provider})`,
          text: [
            isNewUser ? "New user signed up on Zentrify" : "User logged in on Zentrify",
            ``,
            `Name: ${name}`,
            `Email: ${data.user.email}`,
            `Provider: ${provider}`,
            `Time: ${new Date().toISOString()}`,
          ].join("\n"),
        }).catch(() => {});
      }
    }
  }

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
