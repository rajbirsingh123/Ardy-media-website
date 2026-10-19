import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Section3D from "@/components/Section3D";
import SkyField from "@/components/SkyField";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your information.`,
};

const updated = "January 1, 2026";

const sections = [
  {
    title: "1. Who we are",
    body: [
      `${site.name} ("${site.name}", "we", "us" or "our") provides digital marketing, technology development and growth automation services. This Privacy Policy explains what information we collect through ${site.url} (the "Site"), how we use it, and the choices you have.`,
      `By using the Site or submitting information to us through a form, email or call, you agree to the practices described in this policy.`,
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "We collect information in a few different ways:",
    ],
    list: [
      "Information you provide directly — your name, email address, phone number, company details and anything you type into a contact or booking form, or tell us on a strategy call.",
      "Information collected automatically — IP address, browser and device type, pages visited, referring URL, and approximate location, gathered through cookies and similar technologies when you browse the Site.",
      "Information from third parties — such as ad platforms (Meta, Google, LinkedIn) when you arrive via a campaign we run, or from tools you connect to a system we build for you (e.g. a CRM).",
    ],
  },
  {
    title: "3. Cookies and analytics",
    body: [
      "We use cookies and similar technologies to operate the Site, remember your preferences, and understand how visitors use it. This includes analytics tools (such as Google Analytics) and, where you have given consent, advertising pixels (such as the Meta Pixel) used to measure and improve our own campaigns.",
      "Where required by law, a cookie banner lets you accept or decline non-essential cookies before they are set. You can also control cookies through your browser settings at any time.",
    ],
  },
  {
    title: "4. How we use your information",
    list: [
      "To respond to enquiries and provide quotes or proposals",
      "To deliver the services you've engaged us for, including marketing campaigns, websites, CRM and automation builds",
      "To send service-related communications, and — with your consent — occasional updates about our work",
      "To monitor, maintain and improve the Site and our own marketing performance",
      "To meet legal, accounting and security obligations",
    ],
  },
  {
    title: "5. How we share information",
    body: [
      "We do not sell your personal information. We share it only in these circumstances:",
    ],
    list: [
      "With service providers who support our operations — hosting, email delivery, scheduling, payment processing and analytics — bound by confidentiality and data-protection obligations",
      "With advertising and analytics platforms, in aggregated or pseudonymised form, to measure campaign performance",
      `When required by law, regulation, legal process or to protect the rights, property or safety of ${site.name}, our clients or others`,
      "In connection with a merger, acquisition or sale of assets, with notice to you where required",
    ],
  },
  {
    title: "6. Data retention",
    body: [
      "We keep personal information only as long as necessary for the purposes described in this policy, to comply with legal obligations, resolve disputes and enforce agreements. When it's no longer needed, we delete or anonymise it.",
    ],
  },
  {
    title: "7. Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct, export or delete the personal information we hold about you, and to object to or restrict certain processing. To exercise any of these rights, contact us using the details below and we'll respond within a reasonable timeframe.",
    ],
  },
  {
    title: "8. Data security",
    body: [
      "We use reasonable administrative, technical and physical safeguards to protect the information we hold. No method of transmission or storage is completely secure, so we can't guarantee absolute security, but we work to protect your information and to limit who can access it.",
    ],
  },
  {
    title: "9. Children's privacy",
    body: [
      "The Site is intended for business use and is not directed at children. We do not knowingly collect personal information from anyone under 16.",
    ],
  },
  {
    title: "10. Changes to this policy",
    body: [
      `We may update this policy from time to time. The "last updated" date at the top of this page reflects the most recent changes. Material changes will be reflected here, and continued use of the Site after changes take effect constitutes acceptance of the updated policy.`,
    ],
  },
  {
    title: "11. Contact us",
    body: [
      `Questions about this policy or how your information is handled can be sent to ${site.email}.`,
    ],
  },
];

export default function PrivacyPage() {
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
            title="Privacy Policy"
            description={`How ${site.name} collects, uses and protects your information.`}
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
