import cliProgress from "cli-progress";

// create new container
export const cliMultibar = new cliProgress.MultiBar({
  clearOnComplete: false,
  hideCursor: true,
}, cliProgress.Presets.shades_grey);
