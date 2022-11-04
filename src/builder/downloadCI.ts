import { denoZips } from "./denoZips";
import { cliMultibar } from "./progress";
import axios from "axios";

const pkgVersion = process.env.npm_package_version;

export async function downloadCI() {
  const downloadPromises = denoZips.map(async (denoVariant) => {
    const dlUrl =
      `https://github.com/denoland/deno/releases/download/v${pkgVersion}/${denoVariant.zipName}`;

    console.debug(dlUrl);

    const name = `${denoVariant.platform}-${denoVariant.arch}`.padEnd(13, " ");
    const progress = cliMultibar.create(100, 0, { name });

    await axios.get(dlUrl, {
      onDownloadProgress: (progressEvent) => {
        // console.debug(progressEvent);
        const percentCompleted = (progressEvent.progress ?? 0) * 100;
        // console.debug(percentCompleted.toFixed(0));
        progress.update(percentCompleted);

        if (percentCompleted === 100) {
          progress.stop();
        }
      },
    });
  });

  await Promise.all(downloadPromises);
}
