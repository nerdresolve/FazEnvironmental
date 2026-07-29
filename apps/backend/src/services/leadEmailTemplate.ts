import type { Lead } from "../storage/leads.js";

const COLORS = {
  navy: "#0a1930",
  navyDark: "#050d1c",
  green: "#7ec13f",
  gray: "#4b5563",
  grayLight: "#f4f6f8",
  border: "#e5e8ec",
};

// Bulletproof-email helpers: `!important` + duplicate `bgcolor` attribute keep
// colors intact under Gmail/Outlook dark-mode auto-inversion.
const bg = (color: string) => `background-color: ${color} !important;`;
const fg = (color: string) => `color: ${color} !important;`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  });
}

interface InfoRow {
  label: string;
  value: string;
}

// Keys must match apps/frontend/src/data/contactSources.ts (CONTACT_SOURCES values).
const SOURCE_LABELS: Record<string, string> = {
  header: "Botão do menu",
  hero: "Botão principal da página inicial",
  "hero-strip": "Faixa \"avalie a prontidão da sua operação\"",
  "cta-banner": "Banner \"projeto personalizado\"",
  "next-step": "Seção final \"solicitar consulta\"",
  "next-step-secondary": "Seção final \"fale com um consultor\"",
  footer: "Rodapé do site",
  "metodo-faz": "Página Método FAZ",
  sobre: "Página Sobre",
};

function describeSource(source: string): string {
  if (source.startsWith("servico:")) {
    return `Card de serviço — ${source.slice("servico:".length)}`;
  }
  return SOURCE_LABELS[source] || "Site";
}

function buildInfoRows(lead: Lead): InfoRow[] {
  const rows: InfoRow[] = [
    { label: "Cliente", value: lead.name },
    { label: "E-mail", value: lead.email },
  ];
  if (lead.phone) rows.push({ label: "Telefone", value: lead.phone });
  if (lead.company) rows.push({ label: "Empresa", value: lead.company });
  if (lead.source) rows.push({ label: "Origem do contato", value: describeSource(lead.source) });
  rows.push({ label: "Recebido em", value: formatDate(lead.createdAt) });
  return rows;
}

export function buildLeadEmailHtml(lead: Lead): string {
  const rows = buildInfoRows(lead);

  const rowsHtml = rows
    .map(
      (row, index) => `
        <tr>
          <td bgcolor="#ffffff" style="${bg("#ffffff")} padding: 12px 20px; font-size: 13px; font-weight: 600; ${fg(COLORS.gray)} text-transform: uppercase; letter-spacing: 0.04em; width: 160px; vertical-align: top; ${index > 0 ? `border-top: 1px solid ${COLORS.border};` : ""}">
            ${escapeHtml(row.label)}
          </td>
          <td bgcolor="#ffffff" style="${bg("#ffffff")} padding: 12px 20px; font-size: 15px; ${fg(COLORS.navyDark)} font-weight: 500; ${index > 0 ? `border-top: 1px solid ${COLORS.border};` : ""}">
            ${escapeHtml(row.value)}
          </td>
        </tr>`
    )
    .join("");

  return `
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>Novo contato — FAZ</title>
  </head>
  <body style="margin: 0; padding: 0; background: ${COLORS.grayLight}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${COLORS.grayLight}" style="background: ${COLORS.grayLight}; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(10,25,48,0.08);">
            <!-- Banner -->
            <tr>
              <td bgcolor="${COLORS.navyDark}" style="${bg(COLORS.navyDark)} padding: 32px 32px 28px; text-align: center;">
                <img src="cid:faz-logo" alt="FAZ Environmental & Emergency Consulting" width="180" style="display: block; margin: 0 auto; height: auto;" />
              </td>
            </tr>
            <tr>
              <td bgcolor="${COLORS.green}" style="height: 4px; background: ${COLORS.green}; line-height: 4px; font-size: 0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding: 32px 32px 8px;">
                <p style="margin: 0 0 6px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; ${fg(COLORS.green)}">
                  Novo contato pelo site
                </p>
                <h1 style="margin: 0; font-size: 21px; font-weight: 700; ${fg(COLORS.navyDark)} line-height: 1.35;">
                  Prezados Flávio &amp; Zamba, recebemos o contato do cliente ${escapeHtml(lead.name)}${lead.company ? `, da empresa ${escapeHtml(lead.company)}` : ""}.
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid ${COLORS.border}; border-radius: 12px; overflow: hidden;">
                  ${rowsHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 32px 8px;">
                <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; ${fg(COLORS.gray)} text-transform: uppercase; letter-spacing: 0.04em;">
                  Mensagem do cliente
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td bgcolor="${COLORS.grayLight}" style="${bg(COLORS.grayLight)} border-left: 3px solid ${COLORS.green}; border-radius: 8px; padding: 16px 18px; font-size: 15px; line-height: 1.6; ${fg(COLORS.navyDark)} white-space: pre-wrap;">${escapeHtml(lead.message)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 32px 32px;">
                <a href="mailto:${escapeHtml(lead.email)}" style="display: inline-block; ${bg(COLORS.green)} ${fg(COLORS.navyDark)} font-weight: 700; font-size: 14px; text-decoration: none; padding: 13px 26px; border-radius: 8px;">
                  Responder ${escapeHtml(lead.name.split(" ")[0])}
                </a>
              </td>
            </tr>
            <tr>
              <td bgcolor="${COLORS.grayLight}" style="${bg(COLORS.grayLight)} padding: 20px 32px; text-align: center; border-top: 1px solid ${COLORS.border};">
                <p style="margin: 0; font-size: 12px; ${fg(COLORS.gray)}">
                  Este e-mail foi gerado automaticamente a partir do formulário de contato do site da FAZ Environmental &amp; Emergency Consulting.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildLeadEmailText(lead: Lead): string {
  const rows = buildInfoRows(lead);
  const rowsText = rows.map((row) => `${row.label}: ${row.value}`).join("\n");

  return [
    `Prezados Flávio & Zamba, recebemos o contato do cliente ${lead.name}${lead.company ? `, da empresa ${lead.company}` : ""}.`,
    "",
    rowsText,
    "",
    "Mensagem do cliente:",
    lead.message,
    "",
    "---",
    "Este e-mail foi gerado automaticamente a partir do formulário de contato do site da FAZ Environmental & Emergency Consulting.",
  ].join("\n");
}
