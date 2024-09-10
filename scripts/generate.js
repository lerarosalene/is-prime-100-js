const fs = require("node:fs");
const path = require("node:path");
const slowIsPrime = require("../lib/slowIsPrime");

const fsp = fs.promises;

function format(array, maxPerLine = 20) {
  let lines = [];
  for (let i = 0; i < array.length; i += maxPerLine) {
    lines.push(array.subarray(i, i + maxPerLine));
  }

  return lines
    .map(
      (line) =>
        "  " +
        Array.from(line)
          .map((s) => s.toString().padStart(3, " "))
          .join(", ") +
        ","
    )
    .join("\n");
}

const template = (data) =>
  `
const primalities = new Uint8Array([
${format(data)}
]);

function isPrime(n) {
  if (typeof n !== "number" && typeof n !== "bigint") {
    throw new TypeError("n is not a number");
  }
  n = Number(n);
  if (!Number.isInteger(n)) {
    throw new TypeError("n is not an integer");
  }
  if (n < 1) {
    throw new RangeError("n is out of range");
  }

  let index = n - 1;
  let bit = index % 8;
  let byte = Math.floor(index / 8);

  if (byte >= primalities.length) {
    throw new RangeError("n is out of range");
  }

  return Boolean(primalities[byte] & (1 << bit));
}

module.exports = isPrime;
`.trim() + "\n";

const N = 62_500 * 8;

function generate() {
  let data = new Uint8Array(N / 8);

  for (let i = 1; i <= N; ++i) {
    let index = i - 1;
    let bit = index % 8;
    let byte = Math.floor(index / 8);
    if (slowIsPrime(i)) {
      data[byte] |= 1 << bit;
    }
  }

  return template(data);
}

async function main() {
  const source = generate();
  await fsp.writeFile(path.join("src", "index.js"), source);
}

main().catch((error) => {
  console.error(error);
  process.exit(error?.code ?? 1);
});
