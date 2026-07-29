import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Lead } from "../storage/leads.js";
import { smtp, leadEmailTo } from "../config/env.js";
import { buildLeadEmailHtml, buildLeadEmailText } from "./leadEmailTemplate.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_PATH = path.resolve(__dirname, "../assets/logo-email-white.png");

function buildTransport() {
  if (!smtp.host || !smtp.port || !smtp.user || !smtp.pass) {
    return null;
  }
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
  });
}

const transport = buildTransport();

export async function sendLeadEmail(lead: Lead): Promise<void> {
  if (!transport) {
    console.warn("[mailer] SMTP not configured (SMTP_HOST/PORT/USER/PASS) — skipping lead email send.");
    return;
  }

  await transport.sendMail({
    from: smtp.from,
    to: leadEmailTo,
    replyTo: lead.email,
    subject: `Novo contato pelo site FAZ — ${lead.name}`,
    text: buildLeadEmailText(lead),
    html: buildLeadEmailHtml(lead),
    attachments: [
      {
        filename: "faz-logo.png",
        path: LOGO_PATH,
        cid: "faz-logo",
      },
    ],
  });
}
