import * as Comlink from "comlink";
import { DenoVariant } from "./deno-variant.d.ts";
import { downstream } from "downstream";
import { join } from "path.std";
import { ensureDir } from "fs.std";

let progressStream, fileStream;

// can be used to test if the comlink bridge is established correctly
const comlinkReady = true;

async function download(denoVariant: DenoVariant, pkgVersion: string) {
  const dlUrl =
    `https://github.com/denoland/deno/releases/download/v${pkgVersion}/${denoVariant.zipName}`;
  console.debug(dlUrl);

  // 1. Download Deno binary zip from github release page
  const response = await downstream(dlUrl);
  fileStream = response.fileStream;
  progressStream = response.progressStream;

  const outPath = join("dist", "bin", denoVariant.platform, denoVariant.arch);
  await ensureDir(outPath);
  const zipPath = join(outPath, denoVariant.zipName);
  const zipFile = await Deno.open(zipPath, { write: true });

  // 2. Saves zip in out dir
  await fileStream.pipeTo(zipFile.writable);

  // pass progress to progress hook
  // for await (const progress of progressStream) {
  //   progressHook(Number.parseFloat(progress));
  // }

  // const res = await fetch(dlUrl, {
  //   responseType: "stream",
  //   onDownloadProgress: (progressEvent: any) => {
  //     // console.debug(progressEvent);
  //     const percentCompleted = (progressEvent.progress ?? 0) * 100;
  //     // console.debug(percentCompleted.toFixed(0));
  //     progressBar.update(percentCompleted);

  //     if (percentCompleted === 100) {
  //       progressBar.stop();
  //     }
  //   },
  // });
}

Comlink.expose({
  download,
  progressStream,
  comlinkReady,
});
