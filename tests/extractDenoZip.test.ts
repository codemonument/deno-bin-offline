import { downloadVariant } from "@/src/builder/downloadVariant.ts";
import { extractDenoZip } from "@/src/builder/extractDenoZip.ts";
import { DenoVariant } from "../src/builder/DenoVariant.d.ts";
import { assert, assertEquals } from "testing.std";
import { join, resolve } from "path.std";
import { terminateWorkers } from "zipjs";

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

      terminateWorkers();

      /**
       * Check extracted file
       */
      const stats = await Deno.lstat(outFilePath);
      assert(stats.isFile);

      // Check if extracted binary is executable
      const p = Deno.run({
        cmd: [outFilePath, "--version"],
        stdout: "piped",
      });
      const [status, stdout] = await Promise.all([
        p.status(),
        p.output(),
      ]);
      p.close();

      const stdoutString = new TextDecoder().decode(stdout);

      assert(status.success === true);
      assert(stdoutString.startsWith("deno "));

      console.log({ status, stdoutString });
    },
  );
});
