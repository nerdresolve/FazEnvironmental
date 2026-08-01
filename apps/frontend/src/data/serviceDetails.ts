import cpolBoomImg from "../assets/service-cpol-boom.webp";
import icsFirefightingImg from "../assets/service-ics-firefighting.webp";
import imoIImg from "../assets/service-imo-i.webp";
import oilrecAuditImg from "../assets/service-oilrec-audit.webp";
import offshorePracticeImg from "../assets/service-offshore-practice.webp";

export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  whatItDoes: string;
  scope: string[];
  image?: string;
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "combate-poluicao-oleo",
    title: "CPOL — Combate a Poluição por Óleo",
    subtitle: "Online, ao vivo via Zoom",
    summary:
      "Capacita profissionais para atuar na resposta inicial a emergências ambientais com derramamento de óleo, focando na identificação e avaliação do incidente.",
    whatItDoes:
      "Capacita profissionais para atuar na resposta inicial a emergências ambientais com derramamento de óleo, focando na identificação e avaliação do incidente.",
    scope: [
      "Treinamento de 8 horas, 100% online via Zoom",
      "Causas e comportamento do óleo no ambiente",
      "Procedimentos de comunicação em incidentes",
      "Introdução ao ICS (Sistema de Comando de Incidentes)",
      "Estratégias de contenção",
      "Gerenciamento de resíduos",
    ],
    image: cpolBoomImg,
  },
  {
    slug: "ics-100-200-300",
    title: "ICS 100, 200 e 300",
    subtitle: "Sistema de Comando de Incidentes — Online, ao vivo via Zoom",
    summary:
      "Treina a equipe no modelo de gestão padronizado ICS para coordenar de forma eficiente a resposta a emergências complexas.",
    whatItDoes:
      "Treina a equipe no modelo de gestão padronizado ICS para coordenar de forma eficiente a resposta a emergências complexas.",
    scope: [
      "Dividido em dois módulos online via Zoom",
      "ICS 100/200: estrutura básica e resposta inicial",
      "ICS 300: gestão de incidentes de crescimento exponencial e planejamento estratégico",
    ],
    image: icsFirefightingImg,
  },
  {
    slug: "imo-i",
    title: "Treinamento IMO I",
    subtitle: "24 horas, online e ao vivo",
    summary:
      "Qualifica a equipe de primeira resposta para atuar diretamente nas atividades de contenção e controle de vazamentos de óleo.",
    whatItDoes:
      "Qualifica a equipe de primeira resposta para atuar diretamente nas atividades de contenção e controle de vazamentos de óleo.",
    scope: [
      "Carga horária de 24 horas (normalmente 3 dias)",
      "Ministrado de forma online e ao vivo",
      "Base legal aplicável à resposta a derramamentos",
      "Avaliação do derramamento",
      "Planejamento de resposta utilizando o ICS",
      "Segurança operacional",
      "Lições aprendidas de incidentes reais",
    ],
    image: imoIImg,
  },
  {
    slug: "oilrec-safety-check",
    title: "OilRec Safety Check",
    subtitle: "Auditoria técnica da planta ORO",
    summary:
      "Realiza uma auditoria técnica completa na planta de Oil Recovery (ORO) das embarcações OSRV para verificar integridade mecânica e operacionalidade.",
    whatItDoes:
      "Realiza uma auditoria técnica completa na planta de Oil Recovery (ORO) das embarcações OSRV para verificar integridade mecânica e operacionalidade.",
    scope: [
      "Inspeção visual e funcional de barreiras, skimmers e unidades hidráulicas",
      "Análise do histórico de manutenção",
      "Avaliação de conformidade com critérios da Petrobras",
      "Emissão de relatório técnico detalhado com evidências fotográficas",
    ],
    image: oilrecAuditImg,
  },
  {
    slug: "resposta-offshore-pratica",
    title: "Treinamento Prático de Resposta Offshore",
    subtitle: "Presencial a bordo, 2 dias",
    summary:
      "Treinamento presencial a bordo para garantir que a tripulação tenha domínio prático e autonomia na operação de equipamentos de resposta a vazamentos (OSR).",
    whatItDoes:
      "Treinamento presencial a bordo para garantir que a tripulação tenha domínio prático e autonomia na operação de equipamentos de resposta a vazamentos (OSR).",
    scope: [
      "Realizado em 2 dias, a bordo da embarcação",
      "Dia 1: montagem assistida e familiarização com equipamentos (barreiras e skimmers) no convés",
      "Dia 2: simulação completa de lançamento e resposta em campo",
    ],
    image: offshorePracticeImg,
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((service) => service.slug === slug);
}
