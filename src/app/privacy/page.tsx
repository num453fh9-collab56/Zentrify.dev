import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Zentrify privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto prose-container">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted text-sm mb-8">Last updated: October 27, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-muted">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Overview</h2>
            <p>
              Zentrify (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy.
              Our tools run entirely in your browser — we do not collect, store, or transmit
              any data you enter into our tools.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Data We Do Not Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Code, text, or files you input into any tool</li>
              <li>Generated outputs (passwords, hashes, UUIDs, etc.)</li>
              <li>Personal information unless you voluntarily submit it via the contact form</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Data We May Collect</h2>
            <p className="mb-2">We may use the following third-party services:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Google Analytics</strong> — collects anonymous usage data such as pages visited, device type, and approximate location. No personally identifiable information is collected.</li>
              <li><strong>Google AdSense</strong> — may use cookies to serve relevant ads. You can opt out via Google&apos;s Ad Settings.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Contact Form</h2>
            <p>
              When you submit a message through our contact form, we collect your name, email address,
              and message content solely to respond to your inquiry. We do not share this information
              with third parties.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Cookies</h2>
            <p>
              We use minimal cookies for theme preferences and analytics. Third-party services
              (Google Analytics, AdSense) may set their own cookies. You can manage cookie
              preferences through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Third-Party Links</h2>
            <p>
              Our site may contain links to external websites. We are not responsible for the
              privacy practices of other sites.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Children&apos;s Privacy</h2>
            <p>
              Our services are not directed at children under 13. We do not knowingly collect
              personal information from children.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page
              with an updated &quot;Last updated&quot; date.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Contact</h2>
            <p>
              If you have questions about this privacy policy, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
