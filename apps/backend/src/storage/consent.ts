import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONSENT_DIR = path.resolve(__dirname, "../../data/consent-logs");

export interface ConsentEvent {
  id: string;
  choice: "accepted" | "declined";
  path: string;
  createdAt: string;
  /** Only populated when choice is "accepted" — no personal data is stored on decline. */
  ip?: string;
  userAgent?: string;
  gclid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

function dayFilePath(date: Date): string {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return path.join(CONSENT_DIR, year, month, `${day}.jsonl`);
}

export async function appendConsentEvent(event: ConsentEvent): Promise<void> {
  const file = dayFilePath(new Date(event.createdAt));
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.appendFile(file, `${JSON.stringify(event)}\n`, "utf-8");

  const indexFile = path.join(CONSENT_DIR, "index.jsonl");
  const indexEntry = { id: event.id, createdAt: event.createdAt, choice: event.choice, file: path.relative(CONSENT_DIR, file) };
  await fs.appendFile(indexFile, `${JSON.stringify(indexEntry)}\n`, "utf-8");
}
