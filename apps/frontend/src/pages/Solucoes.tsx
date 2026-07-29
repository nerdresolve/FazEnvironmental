import Seo from "../components/Seo";
import ServicesSection from "../components/ServicesSection";
import CtaBanner from "../components/CtaBanner";

export default function Solucoes() {
  return (
    <>
      <Seo
        title="Soluções"
        description="Treinamentos IMO e ICS, resposta a emergência offshore, simulados, laudos de coral-sol e planos de emergência: conheça as linhas de serviço da FAZ."
        path="/solucoes"
      />
      <ServicesSection headingLevel="h1" />

      <section className="section section-light">
        <div className="container">
          <CtaBanner />
        </div>
      </section>
    </>
  );
}
