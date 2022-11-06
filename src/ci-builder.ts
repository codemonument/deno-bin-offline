import { downloadAll } from "@/src/builder/downloadAll.ts";

async function main() {
  await downloadAll();
}

main().then(() => {
  console.log("Dist Package Setup finished");
}).catch((error) =>
  console.log(`Error while setting up the target package in dist!`, error)
);
