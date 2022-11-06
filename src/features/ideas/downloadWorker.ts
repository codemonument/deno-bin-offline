import * as Comlink from "comlink";
import { DenoVariant } from "./deno-variant.d.ts";
import { downstream } from "downstream";
import { join } from "path.std";
import { ensureDir } from "fs.std";

export type ProgressStreamCallback = (
  progressStream: ReadableStream<string>,
) => void;

class Worker {
  // can be used to test if the comlink bridge is established correctly
  public comlinkReady = true;
  public progressStreamCallback: ProgressStreamCallback = () => {};

  async download(denoVariant: DenoVariant, pkgVersion: string) {
    const dlUrl =
      `https://github.com/denoland/deno/releases/download/v${pkgVersion}/${denoVariant.zipName}`;
    console.debug(dlUrl);

    // 1. Download Deno binary zip from github release page
    const { fileStream, progressStream } = await downstream(dlUrl);

    // progressStream.getReader().read().then((progress) => {
    //   //https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope
    //   // @ts-ignore - deno cannot now that this file needs WorkerGlobalScope
    //   self.postMessage(progress);
    // }).catch((error) => {
    //   console.error(error);
    // });

    // Send progress stream back to worker host
    // this.progressStreamCallback(progressStream);

    // const outPath = join("dist", "bin", denoVariant.platform, denoVariant.arch);
    // await ensureDir(outPath);
    // const zipPath = join(outPath, denoVariant.zipName);
    // const zipFile = await Deno.open(zipPath, { write: true });

    // 2. Saves zip in out dir
    // await fileStream.pipeTo(zipFile.writable);

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

  catchProgressStream(pgStreamCB: ProgressStreamCallback) {
    this.progressStreamCallback = pgStreamCB;
  }
}

Comlink.expose(new Worker());
