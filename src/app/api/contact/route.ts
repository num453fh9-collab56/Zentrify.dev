import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUESTS = 3;
const ipRequests = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (typeof subject !== "string" || subject.length > 200) {
      return NextResponse.json(
        { error: "Invalid subject." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.length > 100) {
      return NextResponse.json(
        { error: "Invalid name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 200) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.length > 2000) {
      return NextResponse.json(
        { error: "Message is too long (max 2000 characters)." },
        { status: 400 }
      );
    }

    // TODO: Replace with actual email service (Resend, Nodemailer, etc.)
    // Example with Resend:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Zentrify <noreply@zentrify.com>',
    //   to: 'your@email.com',
    //   subject: `Contact from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    // });

    console.log("[Contact Form]", { name, email, subject, message: message.slice(0, 100) });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process your message." },
      { status: 500 }
    );
  }
}
