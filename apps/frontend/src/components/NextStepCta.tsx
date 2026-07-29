import ContactCtaButton from "./ContactCtaButton";
import { CONTACT_SOURCES } from "../data/contactSources";

export default function NextStepCta() {
  return (
    <section className="section next-step">
      <div className="container">
        <span className="eyebrow eyebrow--light">Próximo passo</span>
        <h2>Sua operação está preparada para responder?</h2>
        <p>
          Consulte treinamentos, auditorias ou projetos personalizados. Vamos construir a solução adequada ao seu
          cenário.
        </p>
        <div className="next-step-actions">
          <ContactCtaButton source={CONTACT_SOURCES.nextStep} className="btn btn-primary">
            Solicitar consulta
          </ContactCtaButton>
          <ContactCtaButton source={CONTACT_SOURCES.nextStepSecondary} className="btn btn-secondary">
            Fale com um consultor
          </ContactCtaButton>
        </div>
      </div>
    </section>
  );
}
