const fs = require("node:fs");
const path = require("node:path");

const fsp = fs.promises;

async function main() {
  await fsp.mkdir("dist", { recursive: true });

  await Promise.all([
    fsp.copyFile(path.join("src", "index.js"), path.join("dist", "index.js")),
    fsp.copyFile(
      path.join("src", "index.d.ts"),
      path.join("dist", "index.d.ts")
    ),
  ]);
}

main().catch((error) => {
  console.error(error);
  process.exit(error?.code ?? 1);
});
