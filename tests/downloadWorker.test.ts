import { assert } from "testing.std";
import * as Comlink from "comlink";

Deno.test(`downloadWorker.ts`, async (ts) => {
  await ts.step(`Can create worker from import_map.json`, async () => {
    const worker = new Worker(
      new URL("../src/builder/downloadWorker.ts", import.meta.url).href,
      {
        type: "module",
      },
    );
    assert(worker);

    const comlinkObj = Comlink.wrap(worker);

    // Fails bc. it can't pack the function into a ppostMessage body, but since this error arrives,
    // i know that the Comlink wrapper works
    assert(await comlinkObj.comlinkReady);

    // console.log(worker);

    worker.terminate();
  });
  // await ts.step(`Can get progress from worker!`, async () => {

  // });
});
