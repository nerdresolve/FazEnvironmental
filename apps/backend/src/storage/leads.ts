import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../../data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  createdAt: string;
}

async function ensureStore(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf-8");
  }
}

export async function readLeads(): Promise<Lead[]> {
  await ensureStore();
  const raw = await fs.readFile(LEADS_FILE, "utf-8");
  return JSON.parse(raw) as Lead[];
}

export async function appendLead(lead: Lead): Promise<void> {
  const leads = await readLeads();
  leads.push(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
