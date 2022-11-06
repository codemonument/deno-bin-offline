import { downloadAll } from "@/src/builder/downloadAll.ts";

Deno.test(`downloadAll()`, async (tc) => {
  await tc.step(
    `Should download all zips simultaneously`,
    async () => {
      await downloadAll();
    },
  );
});
