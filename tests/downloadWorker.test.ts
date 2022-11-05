import { assert } from "testing.std";
import * as Comlink from "comlink";

Deno.test(`downloadWorker.ts`, async (ts) => {
  const workerURL =
    new URL("../src/builder/downloadWorker.ts", import.meta.url).href;
  const workerOptions: WorkerOptions = {
    type: "module",
  };

  await ts.step(`Can create worker from import_map.json`, async () => {
    const rawWorker = new Worker(workerURL, workerOptions);
    const worker = Comlink.wrap(rawWorker);

    assert(rawWorker);
    assert(await worker.comlinkReady);

    rawWorker.terminate();
  });

  // await ts.step(`Can get progress from worker!`, async () => {
  //   const rawWorker = new Worker(workerURL, workerOptions);
  //   const worker = Comlink.wrap(rawWorker);

  //   const progressStreamCB = (progressStream: ReadableStream<string>) => {
  //     console.log(`Received progressStream from worker: `, progressStream);
  //     assert(progressStream);
  //   };

  //   await worker.catchProgressStream(Comlink.proxy(progressStreamCB));
  // });
});
