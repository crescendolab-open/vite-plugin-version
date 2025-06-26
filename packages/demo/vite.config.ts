import { readPackage } from "read-pkg";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { versionPlugin } from "../vite-plugin-version/src";

export default defineConfig(async () => {
  const packageJson = await readPackage();
  return {
    plugins: [
      tsconfigPaths({
        projects: ["./tsconfig.app.json"],
      }),
      versionPlugin(packageJson.version),
    ],
  };
});
