import { denoZips } from "./denoZips";
import { cliMultibar } from "./progress";
import axios from "axios";
import * as fs from "fs-extra";
import { join } from "node:path";
import os from "node:os";
import AdmZip from "adm-zip";

const pkgVersion = process.env.npm_package_version;

export async function downloadCI() {
  const downloadPromises = denoZips.map(async (denoVariant) => {
    const name = `${denoVariant.platform}-${denoVariant.arch}`.padEnd(13, " ");
    const progressBar = cliMultibar.create(100, 0, { name });
    const dlUrl =
      `https://github.com/denoland/deno/releases/download/v${pkgVersion}/${denoVariant.zipName}`;
    console.debug(dlUrl);

    // 1. Download Deno binary zip from github release page
    const res = await axios.get(dlUrl, {
      responseType: "stream",
      onDownloadProgress: (progressEvent) => {
        // console.debug(progressEvent);
        const percentCompleted = (progressEvent.progress ?? 0) * 100;
        // console.debug(percentCompleted.toFixed(0));
        progressBar.update(percentCompleted);

        if (percentCompleted === 100) {
          progressBar.stop();
        }
      },
    });

    const outPath = join("dist", "bin", denoVariant.platform, denoVariant.arch);
    await fs.mkdirp(outPath);
    const zipPath = join(outPath, denoVariant.zipName);
    const zipWriter = fs.createWriteStream(zipPath);

    // 2. Saves zip in out dir
    res.data.pipe(zipWriter).on("close", () => {
      const filename = denoVariant.executableName;
      // 3. Extracts `deno` entry to  folder
      AdmZip(zipPath).extractEntryTo(filename, outPath, true, true, undefined);
      // 4. Changes the file permission
      if (denoVariant.platform !== "win32") {
        fs.chmodSync(join(outPath, filename), 0o755);
      }
      // 5. Removes the zip file
      fs.removeSync(zipPath);
    });
  });

  await Promise.all(downloadPromises);
}
