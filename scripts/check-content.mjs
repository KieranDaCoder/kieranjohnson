// Pre-launch gate: fails while any "[PLACEHOLDER" marker remains in content
// source directories. Expected to exit 1 until real copy replaces them.
import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const NEEDLE = "[PLACEHOLDER";
const roots = ["src/lib", "src/app", "content"].filter(
  (dir) => dir !== "content" || existsSync(dir),
);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) yield* walk(full);
    else if (stat.isFile()) yield full;
  }
}

let hits = 0;
for (const root of roots) {
  if (!existsSync(root)) continue;
  for (const file of walk(root)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (line.includes(NEEDLE)) {
        console.log(`${file}:${i + 1}`);
        hits++;
      }
    });
  }
}

console.log(hits > 0 ? `✗ ${hits} placeholder(s) remaining` : "✓ no placeholders");
process.exit(hits > 0 ? 1 : 0);
