import { assert } from "testing.std";
import * as Comlink from "comlink";

Deno.test(`downloadWorker.ts`, async (ts) => {
  const workerURL =
    new URL("../src/builder/downloadWorker.ts", import.meta.url).href;
  const workerOptions: WorkerOptions = {
    type: "module",
  };

  await ts.step(`Can create worker from import_map.json`, async () => {
    const worker = new Worker(workerURL, workerOptions);
    const comlinkObj = Comlink.wrap(worker);

    assert(worker);
    assert(await comlinkObj.comlinkReady);

    worker.terminate();
  });

  await ts.step(`Can get progress from worker!`, async () => {
  });
});
