import { DenoVariant } from "@/src/types/DenoVariant.d.ts";
import { ZipReader } from "zipjs";
import { join, resolve } from "path.std";
import { ensureDir } from "fs.std";

export type ExtractDenoZipResult = {
  outPath: string;
  filePath: string;
  filename: string;
};

/**
 * @param variant
 * @param zipPath should be an absolute path to a zip file!
 * @param outDir the absolute path to the directory where the output path should be places
 * @returns
 */
export async function extractDenoZip(
  variant: DenoVariant,
  zipPath: string,
  outDir: string,
) {
  // resolve out dir in case it is not an absolute path yet
  outDir = resolve(outDir);
  await ensureDir(outDir);
  const outFileName = variant.executableName;
  const outFilePath = join(outDir, outFileName);

  // 3. Extracts `deno` entry to  folder
  const zipFile = await Deno.open(zipPath, { read: true });
  const zipReader = new ZipReader(zipFile.readable);
  const entries = await zipReader.getEntries();
  const firstEntry = entries.shift();

  // Note: mode flag will be ignored on windows
  const outFile = await Deno.open(outFilePath, {
    write: true,
    create: true,
    mode: 0o755,
  });
  await firstEntry?.getData(outFile.writable);

  await zipReader.close();
  // zipFile.close();
  // outFile.close();

  // 4. Changes the file permission
  // Not necessary anymore, since i set the mode directly in Deno.open(outFilePath) above
  // if (variant.platform !== "win32") {
  //   await Deno.chmod(outFilePath, 0o755);
  // }

  // 5. Removes the zip file
  await Deno.remove(zipPath);

  return {
    outFilePath,
    outFileName,
  };
}
