import * as Comlink from "comlink";

const rawWorker = new Worker(new URL("./worker.ts", import.meta.url).href, {
  type: "module",
});

// WebWorkers use `postMessage` and therefore work with Comlink.
const worker = Comlink.wrap(rawWorker);

function callback(value: any) {
  alert(`Result: ${value}`);
}

/**
 * Demonstrates calling a callback function on the host from inside the worker!
 */
await worker.remoteFunction(Comlink.proxy(callback));

/**
 * Demonstrates the simple use of functions and properties inside the worker
 */
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
