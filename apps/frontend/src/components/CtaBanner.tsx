import ContactCtaButton from "./ContactCtaButton";
import { CONTACT_SOURCES } from "../data/contactSources";

export default function CtaBanner() {
  return (
    <div className="cta-banner">
      <div>
        <span className="eyebrow">Não encontrou exatamente o que precisa?</span>
        <h2>Desenharemos soluções sob medida para o risco e a realidade da sua operação.</h2>
      </div>
      <ContactCtaButton source={CONTACT_SOURCES.ctaBanner} className="btn btn-primary">
        Construir um projeto personalizado
      </ContactCtaButton>
    </div>
  );
}
