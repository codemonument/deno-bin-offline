import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

console.log("Log from worker!");

const obj = {
  counter: 0,
  inc() {
    this.counter++;
  },
};

Comlink.expose(obj);
