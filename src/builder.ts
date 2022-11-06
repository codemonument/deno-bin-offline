import { downloadAll } from "@/src/features/deno-downloads/downloadAll.ts";
import { copyAssets } from "@/src/features/copy-assets/task.ts";
import { renderPackageJson } from "@/src/features/package-json/template.ts";

export type BuilderOptions = {
  skipDownload: boolean;
};

const defaultOptions: BuilderOptions = {
  skipDownload: false,
};

async function main(options?: BuilderOptions) {
  options = (!options) ? defaultOptions : { ...defaultOptions, ...options };
  const { skipDownload } = options;

  if (!skipDownload) {
    await downloadAll();
  } else {
    console.info(`Skipped downloading due to --skipDownload flag`);
  }
  await copyAssets();
  await renderPackageJson();
}

const options: BuilderOptions = defaultOptions;
if (Deno.args[0] === "--skipDownload") {
  options.skipDownload = true;
}

main(options).then(() => {
  console.log("Dist Package Setup finished");
}).catch((error) =>
  console.log(`Error while setting up the target package in dist!`, error)
);
