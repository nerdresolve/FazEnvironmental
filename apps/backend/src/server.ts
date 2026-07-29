import express from "express";
import cors from "cors";
import compression from "compression";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { contactRouter } from "./routes/contact.js";
import { consentRouter } from "./routes/consent.js";
import { isProd, port } from "./config/env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(compression());

if (!isProd) {
  app.use(cors());
}

app.use(express.json());

app.use("/api", contactRouter);
app.use("/api", consentRouter);

if (isProd) {
  const frontendDist = path.resolve(__dirname, "../../frontend/dist/client");

  app.use(
    express.static(frontendDist, {
      setHeaders(res, filePath) {
        if (path.dirname(filePath).endsWith(`${path.sep}assets`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    })
  );

  app.get("*", (req, res) => {
    const routeFile = req.path === "/" ? "index.html" : `${req.path.replace(/^\//, "").replace(/\/$/, "")}.html`;
    res.sendFile(path.join(frontendDist, routeFile), (err) => {
      if (err) res.sendFile(path.join(frontendDist, "index.html"));
    });
  });
}

app.listen(port, () => {
  console.log(`FAZ backend listening on port ${port} (${isProd ? "production" : "development"})`);
});
