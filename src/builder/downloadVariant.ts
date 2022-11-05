/**
 * Downloads one deno variant
 */

import { downstream, simpleProgressCliRenderer } from "downstream";
import { DenoVariant } from "./DenoVariant.d.ts";

export async function downloadVariant(
  denoVariant: DenoVariant,
  pkgVersion: string,
): Promise<void> {
  const dlUrl =
    `https://github.com/denoland/deno/releases/download/v${pkgVersion}/${denoVariant.zipName}`;
  console.debug(dlUrl);

  // 1. Download Deno binary zip from github release page
  const { fileStream, progressStream } = await downstream(dlUrl);

  console.log("before progress");

  const progressPromise = progressStream.pipeTo(simpleProgressCliRenderer())
    .then(() => console.log(`Progress renderer finished`));

  console.log("after progress");

  await progressPromise;
}
