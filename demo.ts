import { ZipReader } from "zipjs";

const zipPath =
  "/Users/bjesuiter/Develop/codemonument/deno-bin-offline/dist/bin/darwin/arm64/deno-aarch64-apple-darwin.zip";

const zipFile = await Deno.open(zipPath, { read: true });
const zipReader = new ZipReader(zipFile.readable);

const entries = await zipReader.getEntries();

const firstEntry = entries.shift();

// pass writable stream to getData to write the data :)
// firstEntry?.getData();

console.log(firstEntry);
