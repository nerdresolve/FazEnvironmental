import ContactCtaButton from "./ContactCtaButton";
import { CONTACT_SOURCES } from "../data/contactSources";

const steps = [
  {
    number: "01",
    title: "Diagnóstico real",
    description: "Partimos da operação, dos riscos, dos equipamentos e do nível de maturidade de cada equipe.",
  },
  {
    number: "02",
    title: "Conhecimento segmentado",
    description: "Desenhamos processos complexos em módulos objetivos que aprofundam a compreensão e são aplicados na prática.",
  },
  {
    number: "03",
    title: "Evolução progressiva",
    description: "Reorganizamos função a função, gradualmente, para que cada equipe da Costa avance com consistência e clareza.",
  },
  {
    number: "04",
    title: "Prontidão comprovada",
    description: "Transformamos conteúdo em decisão, comunicação e capacidade de execução sob pressão.",
  },
];

const stats = [
  { value: "+500", label: "profissionais capacitados" },
  { value: "Tier 3", label: "mais influente na resposta em derramamento" },
  { value: "Porto · Costa · Offshore", label: "atuação nos ambientes de operação relevantes — Campo + Gestão" },
];

export default function MetodoFazSection({ headingId }: { headingId?: string }) {
  return (
    <div className="container">
      <div className="method-grid">
        <div className="method-heading">
          <span className="eyebrow eyebrow--light">Método FAZ</span>
          <h2 id={headingId}>Experiência de campo transformada em prontidão.</h2>
          <p>
            Nossa metodologia foi desenvolvida ao longo de 15 anos de atuação em operações e exercícios reais. Cada
            projeto combina conteúdo técnico, vivência de campo para gerar equipes de maior capacidade,
            autonomia e coordenação.
          </p>
          <ContactCtaButton source={CONTACT_SOURCES.metodoFaz} className="btn-reset link-cta link-cta--light">
            Conheça nosso time →
          </ContactCtaButton>
        </div>
        <ol className="method-steps">
          {steps.map((step) => (
            <li className="method-step" key={step.number}>
              <span className="step-number" aria-hidden="true">
                {step.number}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <ul className="stats-row">
        {stats.map((stat) => (
          <li className="stat-block" key={stat.label}>
            <div className="value">{stat.value}</div>
            <div className="label">{stat.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
