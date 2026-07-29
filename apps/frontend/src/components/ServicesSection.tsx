import SectionHeader from "./SectionHeader";
import ServiceCard from "./ServiceCard";
import { services } from "../data/services";

interface ServicesSectionProps {
  light?: boolean;
  headingLevel?: "h1" | "h2";
}

export default function ServicesSection({ light = false, headingLevel = "h2" }: ServicesSectionProps) {
  return (
    <section className={light ? "section section-light" : "section"}>
      <div className="container">
        <SectionHeader
          as={headingLevel}
          eyebrow="Linhas de serviço"
          title="Da prevenção à resposta. Do plano à operação."
          description="Soluções integradas para formar pessoas, validar processos, aumentar a confiabilidade dos ativos e proteger operações e ecossistemas."
        />
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
