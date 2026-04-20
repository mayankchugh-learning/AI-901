import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readmePath = path.join(__dirname, "..", "README.md");

const raw = fs.readFileSync(readmePath);

/** Detect UTF-16 LE (common when Windows tools save "Unicode") */
function decodeToString(buf) {
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.slice(2).toString("utf16le");
  }
  if (buf.length >= 4 && buf[1] === 0x00 && buf[3] === 0x00 && buf[0] !== 0) {
    return buf.toString("utf16le");
  }
  return buf.toString("utf8");
}

const text = decodeToString(raw);
fs.writeFileSync(readmePath, text, { encoding: "utf8" });
console.log("README.md written as UTF-8, length:", text.length);
