import { downloadAll } from "@/src/builder/downloadAll.ts";
import { assert } from "testing.std";

Deno.test(`downloadAll()`, async (tc) => {
  await tc.step(
    `Should download all zips`,
    async () => {
      const outPaths = await downloadAll();
      for (const path of outPaths) {
        console.log(`LSTAT for `, path);
        const stats = await Deno.lstat(path);
        assert(stats.isFile);
      }
    },
  );
});
