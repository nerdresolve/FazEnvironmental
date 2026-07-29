import { Router } from "express";
import { randomUUID } from "node:crypto";
import { appendConsentEvent } from "../storage/consent.js";

export const consentRouter = Router();

consentRouter.post("/consent", async (req, res) => {
  const { choice, path: pagePath, gclid, utmSource, utmMedium, utmCampaign } = req.body ?? {};

  if (choice !== "accepted" && choice !== "declined") {
    return res.status(400).json({ ok: false, error: "Escolha de consentimento inválida." });
  }

  const base = {
    id: randomUUID(),
    choice: choice as "accepted" | "declined",
    path: typeof pagePath === "string" ? pagePath : "unknown",
    createdAt: new Date().toISOString(),
  };

  if (choice === "declined") {
    await appendConsentEvent(base);
    return res.status(201).json({ ok: true });
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = (typeof forwardedFor === "string" ? forwardedFor.split(",")[0].trim() : req.socket.remoteAddress) || "unknown";

  await appendConsentEvent({
    ...base,
    ip,
    userAgent: req.headers["user-agent"] || "unknown",
    gclid: typeof gclid === "string" ? gclid : undefined,
    utmSource: typeof utmSource === "string" ? utmSource : undefined,
    utmMedium: typeof utmMedium === "string" ? utmMedium : undefined,
    utmCampaign: typeof utmCampaign === "string" ? utmCampaign : undefined,
  });

  return res.status(201).json({ ok: true });
});
