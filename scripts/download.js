/**
 * Downloads all deno os and arch variants for them to be included in the npm package
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { https } = require("follow-redirects");
const pkg = require("./package");
const AdmZip = require("adm-zip");

// platform === process.platform
// arch === process.arch
const variants = [
  {
    platform: "win32",
    filename: "deno-x86_64-pc-windows-msvc.zip",
  },
  {
    platform: "darwin",
    arch: "x64",
    filename: "deno-x86_64-apple-darwin.zip",
  },
  {
    platform: "darwin",
    arch: "arm64",
    filename: "deno-aarch64-apple-darwin.zip",
  },
  {
    platform: "linux",
    filename: "deno-x86_64-unknown-linux-gnu.zip",
  },
];
