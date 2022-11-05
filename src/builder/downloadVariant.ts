/**
 * Downloads one deno variant
 */

import { downstream, simpleProgressCliRenderer } from "downstream";
import { DenoVariant } from "./DenoVariant.d.ts";
import { join } from "path.std";
import { ensureDir } from "fs.std";

export async function downloadVariant(
  denoVariant: DenoVariant,
  pkgVersion: string,
): Promise<void> {
  const dlUrl =
    `https://github.com/denoland/deno/releases/download/v${pkgVersion}/${denoVariant.zipName}`;
  console.debug(dlUrl);

  // 1. Download Deno binary zip from github release page
  const { fileStream, progressStream } = await downstream(dlUrl);

  const progressPromise = progressStream.pipeTo(simpleProgressCliRenderer())
    .then(() => console.log(`Finished downloading!`));

  // Generate Zip File
  const outPath = join("dist", "bin", denoVariant.platform, denoVariant.arch);
  await ensureDir(outPath);
  const zipPath = join(outPath, denoVariant.zipName);
  const zipFile = await Deno.open(zipPath, { write: true });

  // 2. Saves zip in out dir
  const zipWritePromise = fileStream.pipeTo(zipFile.writable).then(() => {
    console.log(`Finished writing zip file!`);
  });

  await Promise.all([progressPromise, zipWritePromise]);
}
