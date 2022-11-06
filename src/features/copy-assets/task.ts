import { isLinux } from "https://deno.land/std@0.162.0/_util/os.ts";

// can only be run on macos or isLinux, bc it sets executable flag on deno.js

export async function copyAssets() {
  await Deno.copyFile(`./assets/index.js`, `./dist/index.js`);
  await Deno.copyFile(`./assets/bin/deno.js`, `./dist/bin/deno.js`);

  await Deno.chmod(`./dist/bin/deno.js`, 0o775);

  await Deno.copyFile(
    `./assets/bin/executables.js`,
    `./dist/bin/executables.js`,
  );

  console.info(`Copied assets!`);
}
