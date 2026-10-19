import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Section3D from "@/components/Section3D";
import SkyField from "@/components/SkyField";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern your use of ${site.url} and any services engaged with ${site.name}.`,
};

const updated = "January 1, 2026";

const sections = [
  {
    title: "1. Agreement to terms",
    body: [
      `These Terms & Conditions ("Terms") govern your use of ${site.url} (the "Site") and any proposal, statement of work or agreement you enter into with ${site.name} ("${site.name}", "we", "us" or "our"). By using the Site or engaging our services, you agree to these Terms. If you don't agree, please don't use the Site or engage our services.`,
    ],
  },
  {
    title: "2. Services",
    body: [
      "We provide digital marketing, technology & development, and growth automation services, including but not limited to paid social and performance advertising, website and application development, CRM configuration, and AI/automation systems.",
      "The specific scope, deliverables, timeline and fees for any engagement are set out in a separate proposal, statement of work or signed agreement, which takes precedence over these Terms where the two conflict.",
    ],
  },
  {
    title: "3. Free strategy calls & quotes",
    body: [
      "A free strategy call or quote does not create a binding obligation on either party to proceed. Any engagement begins only once both parties agree to a scope of work, whether by signed proposal, statement of work, or written confirmation.",
    ],
  },
  {
    title: "4. Fees and payment",
    body: [
      "Fees, payment schedules and billing cycles (one-off, milestone-based or recurring/retainer) are set out in your proposal or agreement. Unless stated otherwise, invoices are due within 14 days of issue. Late payments may result in paused work or suspended services until the account is brought current.",
    ],
  },
  {
    title: "5. Client responsibilities",
    list: [
      "Provide timely access, materials, brand assets, credentials and feedback needed to deliver the engagement",
      "Ensure any content, trademarks or data you provide to us doesn't infringe a third party's rights",
      "Review and approve deliverables within the timeframes agreed in your proposal",
      "Keep account credentials for any systems we build or manage on your behalf secure",
    ],
  },
  {
    title: "6. Intellectual property & ownership",
    body: [
      "Unless your agreement says otherwise, once an engagement is paid in full, you own the deliverables created specifically for you — source code, website, designs, and campaign assets. We retain ownership of our own pre-existing tools, frameworks, know-how and any general methodologies used to deliver the work, and may reuse non-confidential techniques and learnings in work for other clients.",
      "Third-party software, plugins, stock assets or platforms used in a deliverable remain subject to their own licence terms.",
    ],
  },
  {
    title: "7. Confidentiality",
    body: [
      "Each party agrees to keep the other's confidential business, technical and financial information private, and to use it only for the purpose of the engagement, both during and after the engagement ends.",
    ],
  },
  {
    title: "8. Advertising platforms & third-party tools",
    body: [
      "Where we manage advertising accounts, CRMs or other third-party platforms on your behalf, your use of those platforms is also governed by that provider's own terms (e.g. Meta, Google, LinkedIn). We aren't responsible for changes those providers make to their platforms, policies or pricing that affect campaign performance.",
    ],
  },
  {
    title: "9. Results & performance",
    body: [
      "Marketing, advertising and automation outcomes depend on many factors outside our control — market conditions, competition, your offer, pricing, and platform algorithm changes among them. We don't guarantee specific results (leads, rankings, revenue or conversion rates) unless explicitly stated in a signed agreement.",
    ],
  },
  {
    title: "10. Limitation of liability",
    body: [
      `To the fullest extent permitted by law, ${site.name} is not liable for indirect, incidental, special or consequential damages, or for lost profits or revenue, arising from your use of the Site or our services. Our total liability for any claim arising from an engagement is limited to the fees paid to us for that engagement in the three months preceding the claim.`,
    ],
  },
  {
    title: "11. Termination",
    body: [
      "Either party may terminate an ongoing engagement in line with the notice period set out in your proposal or agreement. You remain responsible for fees owed for work completed, and for any costs already committed (such as pre-paid ad spend) up to the termination date.",
    ],
  },
  {
    title: "12. Acceptable use of the Site",
    body: [
      "You agree not to misuse the Site — including attempting unauthorized access, introducing malicious code, scraping content at scale, or using it in a way that could disable, overburden or impair it.",
    ],
  },
  {
    title: "13. Governing law",
    body: [
      "These Terms are governed by the laws of the jurisdiction in which the relevant signed agreement specifies, or, where none is specified, the jurisdiction in which the engaging entity of Ardy Media is registered, without regard to conflict-of-law principles.",
    ],
  },
  {
    title: "14. Changes to these terms",
    body: [
      `We may update these Terms from time to time; the "last updated" date above reflects the most recent revision. Continued use of the Site after changes take effect constitutes acceptance of the updated Terms. Changes to an active engagement's scope or fees require mutual written agreement.`,
    ],
  },
  {
    title: "15. Contact us",
    body: [`Questions about these Terms can be sent to ${site.email}.`],
  },
];

export default function TermsPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#01030a]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 700px at 50% 0%, #0a1730 0%, #030812 55%, #000103 100%)",
          }}
        />
        <SkyField className="absolute inset-0" />
      </div>

      <Section3D className="relative py-20 sm:py-24">
        <Container className="relative z-10">
          <SectionHeading
            dark
            eyebrow={`Last updated ${updated}`}
            title="Terms & Conditions"
            description={`The terms that govern your use of ${site.url} and any services engaged with ${site.name}.`}
          />
        </Container>
      </Section3D>

      <Section3D className="relative pb-24">
        <Container className="relative z-10 max-w-3xl">
          <Reveal className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-lg font-bold text-white">
                  {section.title}
                </h2>
                {section.body?.map((p, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-white/65">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 space-y-2.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-white/65"
                      >
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Reveal>
        </Container>
      </Section3D>
    </>
  );
}
