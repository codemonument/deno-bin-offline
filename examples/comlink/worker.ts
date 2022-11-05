// import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import * as Comlink from "comlink";

console.log("Log from Global worker scope!");

/**
 * Must return a promise, bc. comlink wraps the callback result
 */
export type TextCallback = (text: string) => Promise<unknown>;

class Worker {
  counter = 0;

  inc() {
    this.counter++;
  }
}

async function remoteFunction(cb: TextCallback) {
  await cb("A string from a worker");
}

/**
 * End Worker Scope
 */

Comlink.expose(new Worker());
