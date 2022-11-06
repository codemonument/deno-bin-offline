import { renderPackageJson } from "./template.ts";

Deno.test(`Test package.json rendering`, () => {
  renderPackageJson();
});
