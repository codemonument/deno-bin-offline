const versionsText = await Deno.readTextFile(`../../versions.json`);
const json: {
  DENO_VERSION: string;
  TARGET_PACKAGE_SUFFIX?: string;
} = JSON.parse(versionsText);

// add a prerelease id like this: 1.27.1-beta.1
export const DENO_VERSION = json.DENO_VERSION;
export const TARGET_PACKAGE_VERSION =
  `${DENO_VERSION}${json.TARGET_PACKAGE_SUFFIX}`;

// Add a version alias to not have to change all the sourcecode
export const VERSION = DENO_VERSION;
