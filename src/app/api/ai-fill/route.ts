import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUESTS = 5;
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

interface SectionField {
  key: string;
  label: string;
  type: string;
  itemLabel?: string;
  fields?: { key: string; label: string; type: string }[];
}

interface SectionSchema {
  id: string;
  label: string;
  toggleable: boolean;
  fields: SectionField[];
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured. Add it to .env.local to enable AI fill." },
      { status: 503 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  let body: { description: string; templateId: string; templateName: string; schema: string; sections: SectionSchema[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { description, templateName, sections } = body;
  if (!description || !sections?.length) {
    return NextResponse.json({ error: "Missing description or template sections" }, { status: 400 });
  }

  const sectionInstructions = sections.map((s) => {
    const fieldLines = s.fields.map((f) => {
      if (f.type === "list" && f.fields) {
        const subFields = f.fields.map((sf) => `      "${sf.key}": "${sf.label}" (${sf.type})`).join("\n");
        return `    "${f.key}": array of ${f.itemLabel} objects, each with:\n${subFields}`;
      }
      return `    "${f.key}": "${f.label}" (${f.type})`;
    });
    return `  "${s.id}" (${s.label}${s.toggleable ? ", toggleable" : ""}):\n${fieldLines.join("\n")}`;
  }).join("\n\n");

  const systemPrompt = `You are a landing page content writer. Given a business description, generate compelling, professional content to fill a landing page template.

Rules:
- Write concise, punchy marketing copy — no filler or generic phrases
- Use specific numbers and details that sound realistic for the business described
- For image fields, return empty string "" (the template has its own images)
- For color fields, return empty string "" (keep template defaults)
- For URL fields, use "#" as placeholder
- For list fields, return arrays with 3-4 realistic items
- Match the tone to the business type (professional for B2B, friendly for consumer, etc.)
- Output ONLY valid JSON, no markdown or explanation`;

  const userPrompt = `Business description:
${description}

Template: "${templateName}"

Generate content as a JSON object where keys are section IDs, and values are objects with field keys mapped to their content. Follow this exact structure:

${sectionInstructions}

Return ONLY the JSON object. No markdown code fences, no explanation.`;

  try {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic API error:", res.status, errText);
      return NextResponse.json(
        { error: `AI service error (${res.status})` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "AI returned invalid format" }, { status: 502 });
    }

    const values = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ values });
  } catch (err) {
    console.error("AI fill error:", err);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
