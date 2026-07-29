import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distClient = path.resolve(__dirname, "../dist/client");
const distServer = path.resolve(__dirname, "../dist/server");

const routes = ["/", "/solucoes", "/metodo-faz", "/sobre", "/politica-de-privacidade"];

const template = await readFile(path.join(distClient, "index.html"), "utf-8");
const { render } = await import(pathToFileURL(path.join(distServer, "entry-server.js")));

const cssFile = (await readdir(path.join(distClient, "assets"))).find((f) => f.endsWith(".css"));
const css = await readFile(path.join(distClient, "assets", cssFile), "utf-8");
const linkTag = `<link rel="stylesheet" crossorigin href="/assets/${cssFile}">`;
const inlineTemplate = template.replace(linkTag, `<style>${css}</style>`);

for (const url of routes) {
  const { html, headTags } = render(url);
  const page = inlineTemplate.replace("<!--app-html-->", html).replace("<!--app-head-->", headTags);

  const fileName = url === "/" ? "index.html" : `${url.slice(1)}.html`;
  await writeFile(path.join(distClient, fileName), page, "utf-8");
  console.log(`Prerendered ${url} -> ${fileName}`);
}
