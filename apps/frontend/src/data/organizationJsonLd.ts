import { SITE_NAME, SITE_URL, ORGANIZATION } from "./siteConfig";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: ORGANIZATION.telephone,
  address: {
    "@type": "PostalAddress",
    addressLocality: ORGANIZATION.addressLocality,
    addressRegion: ORGANIZATION.addressRegion,
    addressCountry: ORGANIZATION.addressCountry,
  },
  description:
    "Consultoria ambiental, capacitação técnica e prontidão operacional para organizações que não podem improvisar diante de uma emergência.",
};
