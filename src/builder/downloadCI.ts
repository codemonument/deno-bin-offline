import { denoZips } from "./denoZips";
import axios from "axios";

const pkgVersion = process.env.npm_package_version;

const onDownloadProgress = (name) => (progressEvent) => {
  // console.log(progressEvent);
  const percentCompleted = progressEvent.progress.toFixed(2);
  console.log(` ${name} - download completed:`, percentCompleted);
};

export async function downloadCI() {
  const downloadPromises = denoZips.map(async (denoVariant) => {
    const dlUrl =
      `https://github.com/denoland/deno/releases/download/v${pkgVersion}/${denoVariant.zipName}`;

    console.debug(dlUrl);

    const name = `${denoVariant.platform}-${denoVariant.arch}`;

    await axios.get(dlUrl, { onDownloadProgress: onDownloadProgress(name) });
  });

  await Promise.all(downloadPromises);
}
