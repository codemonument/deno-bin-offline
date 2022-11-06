/**
 * Downloads one deno variant
 */

import { downstream, simpleProgressCliRenderer } from "downstream";
import { DenoVariant } from "./DenoVariant.d.ts";
import { join } from "path.std";
import { ensureDir } from "fs.std";

export type DownloadVariantResult = {
  zipPath: string;
};

export async function downloadVariant(
  denoVariant: DenoVariant,
  pkgVersion: string,
): Promise<DownloadVariantResult> {
  const dlUrl =
    `https://github.com/denoland/deno/releases/download/v${pkgVersion}/${denoVariant.zipName}`;
  const downloadName = denoVariant.zipName.padEnd(30, " ");

  console.info(`Start downloading: ${downloadName}`);

  // 1. Download Deno binary zip from github release page
  const { fileStream, progressStream } = await downstream(dlUrl);

  const progressPromise = progressStream.pipeTo(
    simpleProgressCliRenderer({ title: downloadName }),
  )
    .then(() => console.log(`${downloadName} Download finished`));

  // Generate Zip File
  const outPath = join("dist", "bin", denoVariant.platform, denoVariant.arch);
  await ensureDir(outPath);
  const zipPath = join(outPath, denoVariant.zipName);
  const zipFile = await Deno.open(zipPath, { write: true });

  // 2. Saves zip in out dir
  const zipWritePromise = fileStream.pipeTo(zipFile.writable).then(() => {
    console.log(`${downloadName} Writing Zip file finished`);
  });

  await Promise.all([progressPromise, zipWritePromise]);

  return { zipPath };
}