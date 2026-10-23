import type { Metadata } from "next";
import PillarLanding from "@/components/PillarLanding";
import JsonLd from "@/components/JsonLd";
import { pillarFaqs, site } from "@/lib/content";

const title = "Ardy Digital — Top Website Developers in Canada";
const description =
  "Ardy Digital is a Canadian website development and software engineering team — fast, SEO-ready websites, CRM systems and custom software built for businesses across Canada, from first line of code to launch.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${site.url}/digital` },
  openGraph: {
    title,
    description,
    url: `${site.url}/digital`,
    type: "website",
  },
};

export default function DigitalPage() {
  const faqItems = pillarFaqs["technology-development"] ?? [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Website Development",
          name: "Website Development & Software Engineering",
          description,
          provider: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
            email: site.email,
            telephone: site.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: "483 Burnhamthorpe Rd W",
              addressLocality: "Oakville",
              addressRegion: "ON",
              postalCode: "L6M 4H1",
              addressCountry: "CA",
            },
          },
          areaServed: {
            "@type": "Country",
            name: "Canada",
          },
          url: `${site.url}/digital`,
        }}
      />
      {faqItems.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }}
        />
      )}
      <PillarLanding
        serviceSlug="technology-development"
        heroVideo="/videos/digital-hero.mp4"
        heroVideoPoster="/videos/digital-hero-poster.jpg"
        showSiteComparison
      />
    </>
  );
}
