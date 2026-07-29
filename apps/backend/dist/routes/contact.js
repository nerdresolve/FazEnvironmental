import { Router } from "express";
import { randomUUID } from "node:crypto";
import { appendLead } from "../storage/leads.js";
import { sendLeadEmail } from "../services/mailer.js";
export const contactRouter = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
contactRouter.post("/contact", async (req, res) => {
    const { name, email, phone, company, message, source } = req.body ?? {};
    if (typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).json({ ok: false, error: "Informe o nome." });
    }
    if (typeof email !== "string" || !EMAIL_RE.test(email)) {
        return res.status(400).json({ ok: false, error: "Informe um e-mail válido." });
    }
    if (typeof message !== "string" || message.trim().length === 0) {
        return res.status(400).json({ ok: false, error: "Informe uma mensagem." });
    }
    const lead = {
        id: randomUUID(),
        name: name.trim(),
        email: email.trim(),
        phone: typeof phone === "string" ? phone.trim() : undefined,
        company: typeof company === "string" ? company.trim() : undefined,
        message: message.trim(),
        source: typeof source === "string" ? source.trim() : undefined,
        createdAt: new Date().toISOString(),
    };
    await appendLead(lead);
    try {
        await sendLeadEmail(lead);
    }
    catch (err) {
        console.error("[contact] failed to send lead email:", err);
    }
    return res.status(201).json({ ok: true });
});
