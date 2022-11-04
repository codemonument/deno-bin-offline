/**
 *  Exports a map with all deno variants currently supported by this deno-bin-offline-package
 *
 * platform === process.platform
 * arch === process.arch
 * key of map: `${platform}-${arch}` for faster lookup
 */

const denoVariants = new Map(
  [
    "win32-x64",
    {
      platform: "win32",
      arch: "x64",
      zipName: "deno-x86_64-pc-windows-msvc.zip",
      executableName: "deno.exe",
    },
  ],
  [
    "darwin-x64",
    {
      platform: "darwin",
      arch: "x64",
      zipName: "deno-x86_64-apple-darwin.zip",
      executableName: "deno",
    },
  ],
  [
    "darwin-arm64",
    {
      platform: "darwin",
      arch: "arm64",
      zipName: "deno-aarch64-apple-darwin.zip",
      executableName: "deno",
    },
  ],
  [
    "linux-x32",
    {
      platform: "linux",
      arch: "x32",
      zipName: "deno-x86_64-unknown-linux-gnu.zip",
      executableName: "deno",
    },
  ],
  [
    "linux-x64",
    {
      platform: "linux",
      arch: "x64",
      zipName: "deno-x86_64-unknown-linux-gnu.zip",
      executableName: "deno",
    },
  ]
);

module.exports = {
  denoVariants,
};
