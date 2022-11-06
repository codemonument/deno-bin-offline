import { VERSION } from "@version";

export const packageJson = {
  name: "deno-bin-offline",
  version: VERSION,
  description:
    "An inofficial distribution of the deno binary, a secure runtime for JavaScript and TypeScript (Offline-Install)",
  main: "index.js",
  "files": [
    "index.js",
    "bin",
  ],
  "bin": {
    "deno": "./bin/deno.js",
    "deno-bin-offline": "./bin/deno.js",
  },
};

export function renderPackageJson(outPath?: string) {
  if (!outPath) {
    outPath = `dist/`;
  }
}
