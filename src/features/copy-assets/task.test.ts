import { copyAssets } from "./task.ts";

Deno.test(`copy assets`, async () => {
  await copyAssets();
});
