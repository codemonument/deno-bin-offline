import * as Comlink from "comlink";

const rawWorker = new Worker(new URL("./worker.ts", import.meta.url).href, {
  type: "module",
});

const worker = Comlink.wrap(rawWorker);

function callback(value: any) {
  alert(`Result: ${value}`);
}

// await remoteFunction(Comlink.proxy(callback));

// WebWorkers use `postMessage` and therefore work with Comlink.

alert(`Counter: ${await worker.counter}`);
await worker.inc();
alert(`Counter: ${await worker.counter}`);
await worker.inc();
alert(`Counter: ${await worker.counter}`);
await worker.inc();
alert(`Counter: ${await worker.counter}`);
await worker.inc();
alert(`Counter: ${await worker.counter}`);
await worker.inc();
alert(`Counter: ${await worker.counter}`);

rawWorker.terminate();
