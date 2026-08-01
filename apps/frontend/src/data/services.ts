export type ServiceIconKey =
  | "training"
  | "command"
  | "offshore"
  | "drill"
  | "coral"
  | "oil-spill"
  | "audit"
  | "maintenance"
  | "plan";

export interface Service {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  slug?: string;
  icon: ServiceIconKey;
}

export const services: Service[] = [
  {
    number: "01",
    icon: "training",
    title: "Treinamentos IMO I, II e III",
    description:
      "Formação progressiva para equipes operacionais, supervisores e gestão que atuam diante de riscos de óleo.",
    bullets: [
      "Fundamentação, avaliação e resposta inicial",
      "Estratégias de contenção, recolhimento e gestão de resíduos",
      "Planejamento e execução de treinos de escala",
    ],
    slug: "imo-i",
  },
  {
    number: "02",
    icon: "command",
    title: "ICS 100, 200 e 300",
    description:
      "Capacitação para organizações que respondem, coordenam ou envolvem incidentes de escala e natureza variável.",
    bullets: [
      "ICS 100/200 integrado: linguagem e estrutura inicial",
      "ICS 300: preparação de líderes para incidentes de maior escala",
      "Comando unificado, decisão e execução coordenada",
    ],
    slug: "ics-100-200-300",
  },
  {
    number: "03",
    icon: "offshore",
    title: "Resposta a Emergência Offshore",
    description:
      "Treinamento prático e operacional a bordo para embarcações que confrontam cenários reais de emergência ambiental.",
    bullets: [
      "Navegação, segurança e operação de barreiras e sistemas",
      "Manobras, comunicação e coordenação sob pressão",
      "Simulações de falhas e resposta operacional imediata",
    ],
    slug: "resposta-offshore-pratica",
  },
  {
    number: "04",
    icon: "drill",
    title: "Simulado de Resposta a Emergência",
    description:
      "Exercícios planejados sob medida para testar procedimentos, cadeia de comando, comunicação e capacidade de mobilização real.",
    bullets: [
      "Cenários alinhados aos riscos da operação",
      "Avaliação de desempenho e identificação de lacunas",
      "Relatório com recomendações práticas objetivas",
    ],
  },
  {
    number: "05",
    icon: "coral",
    title: "Laudo de Coral-Sol",
    description:
      "Análise técnica de registros de espécies aquáticas para identificação de organismos invasores do gênero Tubastraea.",
    bullets: [
      "Coleta e análise de amostras em campo",
      "Classificação de espécies e potencial de invasão",
      "Laudo técnico com evidência profissional aplicável",
    ],
  },
  {
    number: "06",
    icon: "oil-spill",
    title: "Combate à Poluição por Óleo",
    description:
      "Curso de 8 horas focado em resposta operacional a derramamentos costeiros e de embarcações de risco.",
    bullets: [
      "Contenção, recolhimento e uso de barreiras e sorventes",
      "Procedimentos de contenção e segurança operacional",
      "Preparação para atuação segura e coordenada",
    ],
    slug: "combate-poluicao-oleo",
  },
  {
    number: "07",
    icon: "audit",
    title: "OilRec Safety Check",
    description:
      "Auditoria completa da planta Oil Recovery em embarcações OSRV, com foco em segurança, operacionalidade e manutenção.",
    bullets: [
      "Inspeção funcional de sistemas e equipamentos críticos",
      "Diagnóstico de risco e não conformidades",
      "Plano de ação técnico e recomendações e priorização",
    ],
    slug: "oilrec-safety-check",
  },
  {
    number: "08",
    icon: "maintenance",
    title: "Manutenção de Equipamentos OilRec",
    description:
      "Suporte técnico especializado para prevenção de falhas, desempenho e segurança dos equipamentos de recuperação de óleo.",
    bullets: [
      "Manutenção preventiva e corretiva",
      "Rastreabilidade e conformidade técnica",
      "Recomendação técnica para substituição e upgrade e reposição",
    ],
  },
  {
    number: "09",
    icon: "plan",
    title: "Planos de Emergência e Estudos Técnicos",
    description:
      "Elaboração e revisão de Planos de Emergência Individual e documentos técnicos para operações e instalações aplicáveis.",
    bullets: [
      "Análise de cenários acidentais e de risco",
      "Estrutura de comunicação e responsabilidades",
      "Planos customizados para operação específica",
    ],
  },
];
