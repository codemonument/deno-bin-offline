#!/usr/bin/env node

import fs from "node:fs";
import { join } from "node:path";
import { denoExecutables } from "./executables";
import child_process from "node:child_process";

(async function () {
  const executable = denoExecutables.get(`${process.platform}-${process.arch}`);

  let executablePath = join(
    __dirname,
    executable.platform,
    executable.arch,
    executable.executableFilename
  );

  if (!fs.existsSync(executablePath))
    throw new Error(`Deno Executable not found at ${executablePath}. Something is wrong with this install.
  Please raise an issue at: https://github.com/codemonument/deno-bin-offline/issues`);

  const p = child_process.spawnSync(executablePath, process.argv.slice(2), {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: false,
  });

  if (p.error) throw new Error(p.error);
})();
