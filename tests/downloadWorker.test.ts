import { assert } from "testing.std";
import * as Comlink from "comlink";

Deno.test(`downloadWorker.ts`, async (ts) => {
  const workerURL =
    new URL("../src/builder/downloadWorker.ts", import.meta.url).href;
  const workerOptions: WorkerOptions = {
    type: "module",
  };

  await ts.step(`Can create download Worker`, async () => {
    const rawWorker = new Worker(workerURL, workerOptions);
    const worker = Comlink.wrap(rawWorker);

    assert(rawWorker);
    assert(await worker.comlinkReady);

    rawWorker.terminate();
  });

  // await ts.step(
  //   `Can receive progress via addEventListener`,
  //   async () => {
  //     const rawWorker = new Worker(workerURL, workerOptions);
  //     const worker = Comlink.wrap(rawWorker);

  //     rawWorker.addEventListener("message", (msg) => {
  //       console.log(msg.data);
  //     });

  //     const res = await worker.download({
  //       platform: "darwin",
  //       arch: "x64",
  //       zipName: "deno-x86_64-apple-darwin.zip",
  //       executableName: "deno",
  //     }, "1.27.1");

  //     rawWorker.terminate();
  //   },
  // );

  // await ts.step(
  //   `Can receive fileStream and progressStream from worker`,
  //   async () => {
  //     const rawWorker = new Worker(workerURL, workerOptions);
  //     const worker = Comlink.wrap(rawWorker);

  //     const res = await worker.download({
  //       platform: "darwin",
  //       arch: "x64",
  //       zipName: "deno-x86_64-apple-darwin.zip",
  //       executableName: "deno",
  //     }, "1.27.1");

  //     assert(res.fileStream instanceof ReadableStream<string>);
  //     assert(res.progressStream);

  //     rawWorker.terminate();
  //   },
  // );

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
