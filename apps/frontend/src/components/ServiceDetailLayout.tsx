import ContactCtaButton from "./ContactCtaButton";
import Reveal from "./Reveal";
import type { ServiceDetail } from "../data/serviceDetails";

export default function ServiceDetailLayout({ service, source }: { service: ServiceDetail; source: string }) {
  return (
    <>
      <section className="section service-detail-hero">
        <div className="container">
          <span className="eyebrow eyebrow--light">{service.subtitle}</span>
          <h1>{service.title}</h1>
          <p>{service.summary}</p>
          <ContactCtaButton source={source} className="btn btn-primary">
            Solicitar proposta
          </ContactCtaButton>
        </div>
      </section>

      <section className="section">
        <div className="container service-detail-body">
          <Reveal>
            <h2>O que faz</h2>
            <p>{service.whatItDoes}</p>
          </Reveal>

          <Reveal delay={80}>
            <h2>Escopo</h2>
            <ul className="service-detail-scope">
              {service.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160} className="service-detail-notes">
            <h2>Observações</h2>
            <ul>
              <li>Validade da proposta: 15 dias corridos após a emissão.</li>
              <li>Pagamento: 100% antecipado à realização do serviço.</li>
              <li>Instrutores certificados internacionalmente pelo The Nautical Institute.</li>
            </ul>
          </Reveal>

          <ContactCtaButton source={source} className="btn btn-primary">
            Solicitar proposta
          </ContactCtaButton>
        </div>
      </section>
    </>
  );
}
