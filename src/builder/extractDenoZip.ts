import { DenoVariant } from "./DenoVariant.d.ts";
import { decompress } from "zip";
import { join } from "path.std";
import { ensureDir } from "fs.std";

export async function extractDenoZip(variant: DenoVariant, zipPath: string) {
  const filename = variant.executableName;
  const outPath = join("dist", "bin", variant.platform, variant.arch);
  await ensureDir(outPath);

  // 3. Extracts `deno` entry to  folder
  decompress(zipPath, outPath, { includeFileName: true });
  // 4. Changes the file permission
  if (variant.platform !== "win32") {
    await Deno.chmod(join(outPath, filename), 0o755);
  }
  // 5. Removes the zip file
  await Deno.remove(zipPath);
}