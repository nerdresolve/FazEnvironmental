import { cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(__dirname, "../src/assets");
const dest = path.resolve(__dirname, "../dist/assets");

await cp(src, dest, { recursive: true });
console.log(`Copied ${src} -> ${dest}`);
