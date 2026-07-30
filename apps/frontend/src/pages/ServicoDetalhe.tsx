import { Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import ServiceDetailLayout from "../components/ServiceDetailLayout";
import { getServiceDetail } from "../data/serviceDetails";
import { serviceSource } from "../data/contactSources";
import { SITE_NAME } from "../data/siteConfig";

export default function ServicoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceDetail(slug) : undefined;

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <>
      <Seo title={service.title} description={service.summary} path={`/servicos/${service.slug}`} jsonLd={jsonLd} />
      <ServiceDetailLayout service={service} source={serviceSource(service.title)} />
    </>
  );
}
