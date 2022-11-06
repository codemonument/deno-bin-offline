import { VERSION } from "@version";
import { denoZips } from "./denoZips.ts";
import { downloadVariant } from "@/src/builder/downloadVariant.ts";

export async function downloadAll() {
  // TODO: Activate this parallel downloading when parallel progressbars are ready & possible
  // const downloadPromises: Promise<void>[] = denoZips.map((denoVariant) => {
  //   return downloadVariant(denoVariant, VERSION);
  // });
  // return Promise.all(downloadPromises);

  await downloadVariant(denoZips[0], VERSION);
  await downloadVariant(denoZips[1], VERSION);
  await downloadVariant(denoZips[2], VERSION);
  await downloadVariant(denoZips[3], VERSION);
}
