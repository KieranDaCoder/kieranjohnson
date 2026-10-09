// Pre-launch gate: fails while any "[PLACEHOLDER" marker remains in content/.
// Expected to exit 1 until Kieran's copy replaces them.
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";

const NEEDLE = "[PLACEHOLDER";

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

let hits = 0;
for (const file of walk("content")) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes(NEEDLE)) {
        console.log(`${file}:${i + 1}`);
        hits++;
      }
    });
}

console.log(hits > 0 ? `✗ ${hits} placeholder(s) remaining` : "✓ no placeholders");
process.exit(hits > 0 ? 1 : 0);
