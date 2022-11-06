import { downloadAll } from "@/src/features/deno-downloads/downloadAll.ts";
import { copyAssets } from "@/src/features/copy-assets/task.ts";
import { renderPackageJson } from "@/src/features/package-json/template.ts";

async function main() {
  await downloadAll();
  await copyAssets();
  await renderPackageJson();
}

main().then(() => {
  console.log("Dist Package Setup finished");
}).catch((error) =>
  console.log(`Error while setting up the target package in dist!`, error)
);
