import SectionHeader from "./SectionHeader";
import ServiceCard from "./ServiceCard";
import { services } from "../data/services";

interface ServicesSectionProps {
  headingLevel?: "h1" | "h2";
  headingId?: string;
}

export default function ServicesSection({ headingLevel = "h2", headingId }: ServicesSectionProps) {
  return (
    <div className="container">
      <SectionHeader
        as={headingLevel}
        headingId={headingId}
        eyebrow="Linhas de serviço"
        title="Da prevenção à resposta. Do plano à operação."
        description="Soluções integradas para formar pessoas, validar processos, aumentar a confiabilidade dos ativos e proteger operações e ecossistemas."
      />
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard key={service.number} service={service} delay={(index % 3) * 80} />
        ))}
      </div>
    </div>
  );
}
