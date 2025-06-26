import type { PluginOption } from "vite";

namespace versionPlugin {
  export interface Options {
    fileName?: string;
    virtualModuleId?: string;
  }
  export type TypeInternal = (
    version: string,
    options?: Options,
  ) => PluginOption;
  export type Type = TypeInternal & {
    defaultOptions: Required<Options>;
  };
}

const defaultOptions = {
  fileName: "version",
  virtualModuleId: "virtual:version",
} as const satisfies versionPlugin.Options;

const versionPluginInternal: versionPlugin.TypeInternal = (
  version,
  options,
) => {
  const fileName = options?.fileName ?? defaultOptions.fileName;
  const route = `/${fileName}`;

  const virtualModuleId =
    options?.virtualModuleId ?? defaultOptions.virtualModuleId;
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;

  return {
    name: "vite-plugin-version",
    configureServer(server) {
      server.middlewares.use(route, (_req, res) => {
        res.setHeader("Content-Type", "text/plain");
        res.end(version);
      });
    },
    generateBundle(_options) {
      // write version to root
      this.emitFile({
        type: "asset",
        fileName,
        source: version,
      });
    },
    resolveId(id) {
      if (id !== virtualModuleId) return;
      return resolvedVirtualModuleId;
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) {
        return null;
      }
      return `export default ${JSON.stringify(version)};`;
    },
  };
};

const versionPlugin: versionPlugin.Type = Object.assign(versionPluginInternal, {
  defaultOptions,
});

export { versionPlugin };
