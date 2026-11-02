"use client";

import { useRef, useState } from "react";
import { Bot, ChevronDown, Copy, Loader2, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "../../components/toast";
import type { EditableTemplate } from "./editor/types";

type Template = { id: string; name: string; category: string };

function buildPromptForLovable(
  description: string,
  template: Template | null,
) {
  const base = template
    ? `I want a professional landing page for my business, inspired by the "${template.name}" template style (${template.category} category).`
    : "I want a professional, modern landing page for my business.";

  return `${base}

## My Business
${description}

## Requirements
- Single-page landing page, fully responsive (mobile-first)
- Modern, clean design with smooth scroll animations
- Dark mode preferred with a professional color palette
- Sections: Hero with CTA, Features/Services, Stats/Social proof, Testimonials, Pricing (if applicable), Contact/CTA, Footer
- Use real-looking placeholder content that matches my business description
- Include proper meta tags and SEO structure
- Use Google Fonts (Inter or similar modern sans-serif)
- CSS animations on scroll (fade in, slide up)
- All images should use Unsplash URLs relevant to the business
- Mobile hamburger menu
- Fully self-contained HTML file (inline CSS + JS, no external dependencies except fonts)

## Tech Stack
- Pure HTML, CSS, and vanilla JavaScript
- No frameworks or build tools needed
- Output a single .html file ready to deploy

Please generate the complete landing page HTML.`;
}

function extractSchemaDescription(template: EditableTemplate): string {
  const lines: string[] = [];
  for (const section of template.schema) {
    if (section.id === "theme" || section.id === "seo") continue;
    const fieldNames = section.fields
      .map((f) => (f.type === "list" ? `${f.label} (list of ${f.itemLabel})` : f.label))
      .join(", ");
    lines.push(`- **${section.label}**: ${fieldNames}`);
  }
  return lines.join("\n");
}

export function AiAssistant({
  templates,
  editableTemplates,
  selectedTemplateId,
  onFillTemplate,
}: {
  templates: Template[];
  editableTemplates: Record<string, EditableTemplate>;
  selectedTemplateId: string | null;
  onFillTemplate: (templateId: string, content: Record<string, Record<string, unknown>>) => void;
}) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [chosenId, setChosenId] = useState("");
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const editableList = templates.filter((t) => editableTemplates[t.id]);
  const activeTemplateId = chosenId || selectedTemplateId || "";
  const activeTemplate = editableList.find((t) => t.id === activeTemplateId) || null;

  const handleCopyPrompt = () => {
    if (!description.trim()) {
      toast("Please describe your business first.");
      return;
    }
    const prompt = buildPromptForLovable(description.trim(), activeTemplate);
    navigator.clipboard.writeText(prompt);
    toast("Prompt copied! Paste it into Lovable, Cursor, or ChatGPT.");
  };

  const handleFillWithAi = async () => {
    if (!description.trim()) {
      toast("Please describe your business first.");
      return;
    }
    if (!activeTemplateId || !editableTemplates[activeTemplateId]) {
      toast("Select an editable template first.");
      return;
    }

    setLoading(true);
    try {
      const tpl = editableTemplates[activeTemplateId];
      const res = await fetch("/api/ai-fill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          templateId: activeTemplateId,
          templateName: tpl.name,
          schema: extractSchemaDescription(tpl),
          sections: tpl.schema
            .filter((s) => s.id !== "theme" && s.id !== "seo")
            .map((s) => ({
              id: s.id,
              label: s.label,
              toggleable: s.toggleable ?? false,
              fields: s.fields.map((f) => ({
                key: f.key,
                label: f.label,
                type: f.type,
                ...(f.type === "list"
                  ? {
                      itemLabel: f.itemLabel,
                      fields: f.fields.map((sf) => ({ key: sf.key, label: sf.label, type: sf.type })),
                    }
                  : {}),
              })),
            })),
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "AI generation failed");
      }

      const data = await res.json();
      onFillTemplate(activeTemplateId, data.values);
      toast("Template filled with AI content! Opening editor...");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast(msg.includes("API key") ? "Set ANTHROPIC_API_KEY in .env.local to use AI fill." : `Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors cursor-pointer"
      >
        <Bot className="w-4 h-4" />
        AI Assistant
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-4 rounded-xl border border-surface-border bg-surface p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-[15px]">Describe your business</h3>
              <p className="text-xs text-muted mt-0.5">
                Tell us what your business does, who your customers are, and what makes you unique.
                We&apos;ll generate landing page content or a prompt you can use with Lovable / Cursor.
              </p>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. We're a SaaS startup that helps small restaurants manage online orders, table reservations, and customer loyalty programs. Our customers are restaurant owners who want to digitize their operations without complex software..."
            rows={4}
            className="w-full rounded-lg border border-surface-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary/50 resize-y"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <label htmlFor="ai-template" className="text-xs font-medium text-muted">
                Template
              </label>
              <select
                id="ai-template"
                value={activeTemplateId}
                onChange={(e) => setChosenId(e.target.value)}
                className="h-8 px-2 text-xs rounded-lg border border-surface-border bg-background text-foreground focus:outline-none focus:border-primary/50 cursor-pointer"
              >
                <option value="">Choose a template...</option>
                {editableList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 sm:ml-auto">
              <button
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1.5 h-9 px-4 text-sm font-medium rounded-lg border border-surface-border text-foreground hover:border-primary/40 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Prompt for Lovable / Cursor
              </button>
              <button
                onClick={handleFillWithAi}
                disabled={loading || !activeTemplateId}
                className="inline-flex items-center gap-1.5 h-9 px-4 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                {loading ? "Generating..." : "Fill with AI"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
