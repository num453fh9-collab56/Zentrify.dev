import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Zentrify terms of service — rules for using our tools.",
};

export default function TermsPage() {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto prose-container">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted text-sm mb-8">Last updated: October 27, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-muted">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Acceptance of Terms</h2>
            <p>
              By accessing and using Zentrify (&quot;the Service&quot;), you accept and agree to be
              bound by these Terms of Service. If you do not agree, please do not use the Service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Description of Service</h2>
            <p>
              Zentrify provides free, browser-based developer and designer utility tools. All tools
              run client-side in your browser. We do not guarantee uninterrupted access to the Service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Use of Tools</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tools are provided &quot;as is&quot; without warranty of any kind.</li>
              <li>You are responsible for the data you input and the output you generate.</li>
              <li>You may use generated content (landing pages, passwords, code) for personal and commercial purposes.</li>
              <li>You may not use the Service for illegal purposes or to generate harmful content.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Intellectual Property</h2>
            <p>
              The Zentrify brand, logo, design, and source code are owned by Zentrify.
              Content you generate using our tools belongs to you.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Limitation of Liability</h2>
            <p>
              Zentrify shall not be liable for any damages arising from your use of the Service,
              including but not limited to data loss, security breaches from generated passwords
              used in production, or any inaccuracies in tool output.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Advertising</h2>
            <p>
              The Service may display advertisements through Google AdSense or similar networks.
              Ad content is managed by third parties and does not constitute endorsement by Zentrify.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Modifications</h2>
            <p>
              We reserve the right to modify or discontinue the Service, or any tool within it,
              at any time without prior notice. We may also update these Terms at any time.
              Continued use constitutes acceptance of any changes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Contact</h2>
            <p>
              For questions regarding these terms, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
