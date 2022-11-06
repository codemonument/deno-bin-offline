import { VersionsJson } from "@/src/types/versions.json.d.ts";

// Deno starts with cwd at the root of the repo :)
const versionsText = await Deno.readTextFile(`./versions.json`);
const json: VersionsJson = JSON.parse(versionsText);

// add a prerelease id like this: 1.27.1-beta.1
export const DENO_VERSION = json.DENO_VERSION;
export const TARGET_PACKAGE_VERSION =
  `${DENO_VERSION}${json.TARGET_PACKAGE_SUFFIX}`;

// Add a version alias to not have to change all the sourcecode
export const VERSION = DENO_VERSION;
