import { copyAssets } from "./main.ts";

Deno.test(`copy assets`, async () => {
  await copyAssets();
});
