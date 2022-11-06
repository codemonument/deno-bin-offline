export async function copyAssets() {
  await Deno.copyFile(`./assets/index.js`, `./dist/index.js`);
  await Deno.copyFile(`./assets/bin/deno.js`, `./dist/bin/deno.js`);
  await Deno.copyFile(
    `./assets/bin/executables.js`,
    `./dist/bin/executables.js`,
  );

  console.info(`Copied assets!`);
}
