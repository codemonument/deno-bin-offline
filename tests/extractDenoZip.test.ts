import { downloadVariant } from "@/src/builder/downloadVariant.ts";
import { extractDenoZip } from "@/src/builder/extractDenoZip.ts";
import { DenoVariant } from "../src/builder/DenoVariant.d.ts";
import { assert } from "testing.std";
import { join, resolve } from "path.std";

Deno.test(`extractDenoZip()`, async (tc) => {
  await tc.step(
    `Should download the zip and extract it afterwards`,
    async () => {
      const variant: DenoVariant = {
        platform: "darwin",
        arch: "x64",
        zipName: "deno-x86_64-apple-darwin.zip",
        executableName: "deno",
      };
      const { zipPath } = await downloadVariant(variant, "1.27.1");
      console.log(zipPath);

      const outDir = resolve(
        join("dist", "bin", variant.platform, variant.arch),
      );

      const { outFilePath } = await extractDenoZip(variant, zipPath, outDir);

      /**
       * Check extracted file
       */
      const stats = await Deno.lstat(outFilePath);
      assert(stats.isFile);

      if (variant.platform !== "win32") {
        assert(stats.mode === 0o755);
      }
    },
  );
});
