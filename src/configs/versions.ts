await Deno;

// add a prerelease id like this: 1.27.1-beta.1
export const DENO_VERSION = "1.27.1";
export const TARGET_PACKAGE_VERSION = `${DENO_VERSION}-local.1`;

// Add a version alias to not have to change all the sourcecode
export const VERSION = DENO_VERSION;
