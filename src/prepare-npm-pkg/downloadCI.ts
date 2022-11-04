import { denoZips } from "./denoZips";
import axios from "axios";

const pkgVersion = process.env.npm_package_version;

export async function downloadCI() {
  const downloadPromises = denoZips.map(async (denoVariant) => {
    const dlUrl =
      `https://github.com/denoland/deno/releases/download/v${pkgVersion}/${denoVariant.zipName}`;
    await axios.get(dlUrl);
  });

  await Promise.all(downloadPromises);
}
