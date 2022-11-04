import * as Comlink from "comlink";

const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
  type: "module",
});

// WebWorkers use `postMessage` and therefore work with Comlink.
const obj = Comlink.wrap(worker);
alert(`Counter: ${await obj.counter}`);
await obj.inc();
alert(`Counter: ${await obj.counter}`);
await obj.inc();
alert(`Counter: ${await obj.counter}`);
await obj.inc();
alert(`Counter: ${await obj.counter}`);
await obj.inc();
alert(`Counter: ${await obj.counter}`);
await obj.inc();
alert(`Counter: ${await obj.counter}`);

worker.terminate();
