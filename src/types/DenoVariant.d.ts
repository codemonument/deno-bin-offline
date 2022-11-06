export type DenoVariant = {
  platform: "win32" | "darwin" | "linux";
  arch: "x64" | "x86_64" | "arm64";
  zipName: string;
  executableName: "deno.exe" | "deno";
};
