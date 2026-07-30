import ContactCtaButton from "./ContactCtaButton";
import { CONTACT_SOURCES } from "../data/contactSources";

export default function SobreSection({ headingId }: { headingId?: string }) {
  return (
    <div className="container">
      <div className="about-grid">
        <div className="about-copy">
          <span className="eyebrow">Fazendo a própria história</span>
          <h2 id={headingId}>Nascemos para elevar o padrão da resposta ambiental.</h2>
          <p>
            A FAZ Environmental &amp; Emergency Consulting nasceu da convicção de que conhecimento adquirido em
            operações reais precisa gerar algo maior: organizações mais preparadas, profissionais mais seguros e
            impactos ambientais menores. Reunimos experiência técnica, visão estratégica e vivência de campo para
            aproximar planejamento e execução, ajudando nossos clientes a construir capacidade de resposta que
            funciona quando cada decisão importa.
          </p>
          <ul className="pill-tags">
            <li className="pill-tag">Rigor técnico</li>
            <li className="pill-tag">Aplicação prática</li>
            <li className="pill-tag">Responsabilidade ambiental</li>
          </ul>
          <ContactCtaButton source={CONTACT_SOURCES.sobre} className="btn-reset link-cta about-link">
            Conheça quem constrói a FAZ →
          </ContactCtaButton>
        </div>
        <div className="about-visual dot-grid-overlay" aria-hidden="true" />
      </div>
    </div>
  );
}
