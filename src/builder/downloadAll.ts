import { VERSION } from "@version";
import { denoZips } from "./denoZips.ts";
import { downloadVariant } from "@/src/builder/downloadVariant.ts";

export async function downloadAll() {
  // TODO: Activate this parallel downloading when parallel progressbars are ready & possible
  // const downloadPromises: Promise<void>[] = denoZips.map((denoVariant) => {
  //   return downloadVariant(denoVariant, VERSION);
  // });
  // return Promise.all(downloadPromises);

  const variant1 = denoZips[0];
  const variant2 = denoZips[1];
  const variant3 = denoZips[2];
  const variant4 = denoZips[3];

  const res1 = await downloadVariant(variant1, VERSION);
  const res2 = await downloadVariant(variant2, VERSION);
  const res3 = await downloadVariant(variant3, VERSION);
  const res4 = await downloadVariant(variant4, VERSION);
}
