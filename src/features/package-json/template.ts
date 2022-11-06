import { VERSION } from "@version";

export const packageJson = {
  name: "deno-bin-offline",
  version: VERSION,
  description:
    "An inofficial distribution of the deno binary, a secure runtime for JavaScript and TypeScript (Offline-Install)",
  type: "module",
  // Not needded for type module
  // main: "index.js",
  // Note: Automatically added files:
  // main script (if applicable), Readme.md, package.json
  files: [
    "bin",
  ],
  bin: {
    "deno": "./bin/deno.js",
    "deno-bin-offline": "./bin/deno.js",
  },
  repository: {
    type: "git",
    url: "git+https://github.com/codemonument/deno-bin-offline.git",
  },
  keywords: [
    "deno",
  ],
  author: "Benjamin Jesuiter",
  license: "MIT",
  bugs: {
    url: "https://github.com/codemonument/deno-bin-offline/issues",
  },
  homepage: "https://github.com/codemonument/deno-bin-offline#readme",
  dependencies: {
    "adm-zip": "^0.5.4",
  },
  devDependencies: {},
};

export function renderPackageJson(outPath?: string) {
  if (!outPath) {
    outPath = `dist/`;
  }
}
