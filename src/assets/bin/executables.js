/**
 *  Exports a map with all deno variants currently supported by this deno-bin-offline-package
 *
 * platform === process.platform
 * arch === process.arch
 * key of map: `${platform}-${arch}` for faster lookup
 */

export const denoExecutables = new Map([
  [
    "win32-x64",
    {
      platform: "win32",
      arch: "x64",
      executableName: "deno.exe",
    },
  ],
  [
    "darwin-x64",
    {
      platform: "darwin",
      arch: "x64",
      executableName: "deno",
    },
  ],
  [
    "darwin-arm64",
    {
      platform: "darwin",
      arch: "arm64",
      executableName: "deno",
    },
  ],
  [
    "linux-x32",
    {
      platform: "linux",
      arch: "x86_64",
      executableName: "deno",
    },
  ],
  [
    "linux-x64",
    {
      platform: "linux",
      arch: "x86_64",
      executableName: "deno",
    },
  ],
]);
