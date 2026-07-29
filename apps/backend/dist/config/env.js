export const isProd = process.env.NODE_ENV === "production";
export const port = process.env.PORT ? Number(process.env.PORT) : 3001;
export const smtp = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
};
export const leadEmailTo = process.env.LEAD_EMAIL_TO || "flavioaugusto0209@gmail.com";
