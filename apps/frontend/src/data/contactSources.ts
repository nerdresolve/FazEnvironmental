export const CONTACT_SOURCES = {
  header: "header",
  footer: "footer",
  hero: "hero",
  heroStrip: "hero-strip",
  ctaBanner: "cta-banner",
  nextStep: "next-step",
  nextStepSecondary: "next-step-secondary",
  metodoFaz: "metodo-faz",
  sobre: "sobre",
} as const;

export function serviceSource(title: string): string {
  return `servico:${title}`;
}
