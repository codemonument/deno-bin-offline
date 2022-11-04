import { downloadCI } from "./src/builder/downloadCI";

downloadCI().then(() => {
  console.log("Download successful!");
}).catch((error) => console.log(`download error`, error));
