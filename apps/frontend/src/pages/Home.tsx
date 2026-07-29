import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import ContactCtaButton from "../components/ContactCtaButton";
import ServicesSection from "../components/ServicesSection";
import CtaBanner from "../components/CtaBanner";
import NextStepCta from "../components/NextStepCta";
import { CONTACT_SOURCES } from "../data/contactSources";
import { organizationJsonLd } from "../data/organizationJsonLd";
import heroBg from "../assets/hero-background.jpg";
import heroBgWebp from "../assets/hero-background.webp";

const heroStats = [
  { value: "+15", label: "anos de experiência em emergência" },
  { value: "NI 360°", label: "visão e atuação 360° na operação" },
];

export default function Home() {
  return (
    <>
      <Seo
        title="FAZ Environmental & Emergency Consulting"
        description="Consultoria ambiental, capacitação técnica e prontidão operacional para organizações que não podem improvisar diante de uma emergência."
        path="/"
        jsonLd={organizationJsonLd}
      />
      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <span className="eyebrow eyebrow--light">Environmental · Emergency · Offshore</span>
            <h1>
              Antecipamos riscos. Preparamos pessoas. <span className="accent">Protegemos operações.</span>
            </h1>
            <p>
              Consultoria ambiental, capacitação técnica e prontidão operacional para organizações que não podem
              improvisar diante de uma emergência.
            </p>
            <div className="hero-actions">
              <ContactCtaButton source={CONTACT_SOURCES.hero} className="btn btn-primary">
                Solicitar uma proposta
              </ContactCtaButton>
              <Link className="btn btn-secondary" to="/solucoes">
                Explorar soluções
              </Link>
            </div>
            <ul className="hero-stats">
              {heroStats.map((stat) => (
                <li className="hero-stat" key={stat.label}>
                  <div className="value">{stat.value}</div>
                  <div className="label">{stat.label}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <picture>
              <source srcSet={heroBgWebp} type="image/webp" />
              <img
                src={heroBg}
                alt=""
                width={700}
                height={580}
                {...{ fetchpriority: "high" }}
              />
            </picture>
          </div>
          <div className="hero-strip container" style={{ padding: 0, gridColumn: "1 / -1" }}>
            <span>Resposta ambiental começa antes do incidente</span>
            <ContactCtaButton source={CONTACT_SOURCES.heroStrip} className="btn-reset link-cta">
              Avalie a prontidão da sua operação →
            </ContactCtaButton>
          </div>
        </div>
      </section>

      <ServicesSection light />

      <section className="section">
        <div className="container">
          <CtaBanner />
        </div>
      </section>

      <NextStepCta />
    </>
  );
}
