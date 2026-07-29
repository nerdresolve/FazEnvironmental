import ContactCtaButton from "./ContactCtaButton";
import { serviceSource } from "../data/contactSources";
import type { Service } from "../data/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <span className="number" aria-hidden="true">
        {service.number}
      </span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul>
        {service.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <ContactCtaButton source={serviceSource(service.title)} className="btn-reset link-cta">
        Consultar este serviço →
      </ContactCtaButton>
    </article>
  );
}
