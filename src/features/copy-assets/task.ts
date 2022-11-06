export async function copyAssets() {
  await Deno.copyFile(`./src/assets/index.js`, `./dist/index.js`);
  await Deno.copyFile(`./src/assets/bin/deno.js`, `./dist/bin/deno.js`);
  await Deno.copyFile(
    `./src/assets/bin/executables.js`,
    `./dist/bin/executables.js`,
  );

  console.info(`Copied assets!`);
}
