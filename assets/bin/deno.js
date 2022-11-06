#!/usr/bin/env node

import fs from "node:fs";
import { join } from "node:path";
import child_process from "node:child_process";
import { denoExecutables } from "./executables";

(async function () {
  const executable = denoExecutables.get(`${process.platform}-${process.arch}`);

  const executableFilename = process.platform === "win32" ? "deno.exe" : "deno";

  let executablePath = path.join(__dirname, executableFilename);

  if (!fs.existsSync(executablePath)) await require("../install.js");

  const p = child_process.spawnSync(executablePath, process.argv.slice(2), {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: false,
  });

  if (p.error) throw new Error(p.error);
})();
