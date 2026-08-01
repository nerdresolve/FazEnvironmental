import { Link } from "react-router-dom";
import ContactCtaButton from "./ContactCtaButton";
import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";
import { serviceSource } from "../data/contactSources";
import type { Service } from "../data/services";

export default function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal as="article" className="service-card" delay={delay}>
      <div className="service-card-top">
        <span className="service-icon-badge" aria-hidden="true">
          <ServiceIcon icon={service.icon} />
        </span>
        <span className="number" aria-hidden="true">
          {service.number}
        </span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul>
        {service.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {service.slug ? (
        <Link to={`/servicos/${service.slug}`} className="link-cta">
          Consultar este serviço →
        </Link>
      ) : (
        <ContactCtaButton source={serviceSource(service.title)} className="btn-reset link-cta">
          Consultar este serviço →
        </ContactCtaButton>
      )}
    </Reveal>
  );
}
