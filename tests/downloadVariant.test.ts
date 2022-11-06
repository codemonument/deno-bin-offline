import { downloadVariant } from "@/src/builder/downloadVariant.ts";

Deno.test(`downloadVariant()`, async (tc) => {
  await tc.step(
    `Should download the zip and output progress simultaneously`,
    async () => {
      const { zipPath } = await downloadVariant({
        platform: "darwin",
        arch: "x64",
        zipName: "deno-x86_64-apple-darwin.zip",
        executableName: "deno",
      }, "1.27.1");

      await Deno.remove(zipPath);
    },
  );
});
