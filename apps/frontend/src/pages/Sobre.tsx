import Seo from "../components/Seo";
import ContactCtaButton from "../components/ContactCtaButton";
import NextStepCta from "../components/NextStepCta";
import { CONTACT_SOURCES } from "../data/contactSources";

export default function Sobre() {
  return (
    <>
      <Seo
        title="Sobre a FAZ"
        description="Conheça a FAZ Environmental & Emergency Consulting: rigor técnico, aplicação prática e responsabilidade ambiental em cada projeto de resposta a emergências."
        path="/sobre"
      />
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-copy">
              <span className="eyebrow">Fazendo a própria história</span>
              <h1>Nascemos para elevar o padrão da resposta ambiental.</h1>
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
      </section>

      <NextStepCta />
    </>
  );
}
