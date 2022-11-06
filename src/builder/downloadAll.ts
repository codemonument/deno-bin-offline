import { VERSION } from "@version";
import { denoZips } from "./denoZips.ts";
import { downloadVariant } from "@/src/builder/downloadVariant.ts";
import { join, resolve } from "path.std";
import { terminateWorkers } from "zipjs";
import { extractDenoZip } from "./extractDenoZip.ts";

export async function downloadAll() {
  // TODO: Activate this parallel downloading when parallel progressbars are ready & possible
  // const downloadPromises: Promise<void>[] = denoZips.map((denoVariant) => {
  //   return downloadVariant(denoVariant, VERSION);
  // });
  // return Promise.all(downloadPromises);

  // Note: This will download and extract each zip one at a time (because each for-loop iteration will be awaited)
  const outFilePaths = [];
  for (const variant of denoZips) {
    const { zipPath } = await downloadVariant(variant, VERSION);

    const outDir = resolve(
      join("dist", "bin", variant.platform, variant.arch),
    );
    const { outFilePath } = await extractDenoZip(variant, zipPath, outDir);
    outFilePaths.push(outFilePath);
  }

  terminateWorkers();

  return outFilePaths;
}
