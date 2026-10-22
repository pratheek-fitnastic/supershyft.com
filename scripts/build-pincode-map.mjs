/**
 * Build a compact pincode → city JSON map from the local pincodes.csv.
 * The CSV is gitignored and never deployed; this generated file is.
 *
 * Usage: node scripts/build-pincode-map.mjs
 */
import { createReadStream } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = join(root, "pincodes.csv");
const outPath = join(root, "assets", "data", "pincode-city.json");

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function pickMostFrequent(counts) {
  let bestCity = "";
  let bestCount = -1;
  Object.keys(counts).forEach(function (city) {
    const n = counts[city];
    if (n > bestCount || (n === bestCount && city < bestCity)) {
      bestCity = city;
      bestCount = n;
    }
  });
  return bestCity;
}

const pinCounts = new Map();
let rows = 0;
let header = null;

const rl = createInterface({
  input: createReadStream(csvPath, { encoding: "utf8" }),
  crlfDelay: Infinity,
});

for await (const raw of rl) {
  const line = raw.replace(/^\uFEFF/, "").trim();
  if (!line) continue;
  const cols = parseCsvLine(line);
  if (!header) {
    header = cols;
    continue;
  }
  const pin = String(cols[1] || "").trim();
  const city = String(cols[3] || "").trim();
  if (!/^\d{6}$/.test(pin) || !city) continue;
  rows += 1;
  let counts = pinCounts.get(pin);
  if (!counts) {
    counts = Object.create(null);
    pinCounts.set(pin, counts);
  }
  counts[city] = (counts[city] || 0) + 1;
}

const map = {};
let multi = 0;
pinCounts.forEach(function (counts, pin) {
  if (Object.keys(counts).length > 1) multi += 1;
  map[pin] = pickMostFrequent(counts);
});

const pins = Object.keys(map);
pins.sort();
const sorted = {};
pins.forEach(function (pin) {
  sorted[pin] = map[pin];
});

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, JSON.stringify(sorted), "utf8");

console.log(
  `Wrote ${pins.length} pincodes (${rows} rows, ${multi} multi-city) → ${outPath}`
);
