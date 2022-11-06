export async function copyAssets() {
  await Deno.copyFile(`./src/assets/index.js`, `./dist/index.js`);
}
