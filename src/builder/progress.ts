import cliProgress from "cli-progress";

// create new container
export const cliMultibar = new cliProgress.MultiBar({
  clearOnComplete: false,
  hideCursor: true,
  // format:
  //   "{name} download: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
  format: "{name} download: [{bar}] {percentage}%",
}, cliProgress.Presets.shades_grey);
