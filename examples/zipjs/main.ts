import { downloadVariant } from "@/src/builder/downloadVariant.ts";
import { DenoVariant } from "../../src/builder/DenoVariant.d.ts";
import { extractDenoZip } from "../../src/builder/extractDenoZip.ts";
import { join, resolve } from "path.std";
import { ensureDir } from "fs.std";
import { ZipReader } from "zipjs";

const variant: DenoVariant = {
  platform: "darwin",
  arch: "x64",
  zipName: "deno-x86_64-apple-darwin.zip",
  executableName: "deno",
};

const { zipPath } = await downloadVariant(variant, "1.27.1");
console.log(zipPath);

const outDir = resolve(join("examples", "zipjs"));

const { outFilePath } = await extractDenoZip(variant, zipPath, outDir);

console.log(outFilePath);

await Deno.remove(zipPath);
