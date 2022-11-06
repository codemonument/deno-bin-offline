const newDenoVersion = Deno.args[0];
import { VersionsJson } from "@/src/types/versions.json.d.ts";
const newTargetPackageSuffix = Deno.args[1];

if (newDenoVersion === undefined) {
  throw new Error(`First Param: DENO_VERSION is undefined!`);
}
if (newTargetPackageSuffix === undefined) {
  throw new Error(`Second Param: TARGET_PACKAGE_SUFFIX is undefined!`);
}

// add a prerelease id like this: 1.27.1-beta.1
const newJson: VersionsJson = {
  DENO_VERSION: newDenoVersion,
  TARGET_PACKAGE_SUFFIX: newTargetPackageSuffix,
};

// Deno starts with cwd at the root of the repo :)
await Deno.writeTextFile(
  `./versions.json`,
  JSON.stringify(newJson, null, " \t"),
);
