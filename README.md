# Vite Plugin Version

A Vite plugin that exposes build version information both as a static file and as a virtual import.

## Use Cases

With this plugin, we can:

- Expose the version as an API endpoint
- Display the version within the web app
- Check if a new version of the app is available

## Installation

Add the plugin to the project:

```bash
pnpm add @crescendolab/vite-plugin-version
```

## Usage

Import and configure the plugin in `vite.config.ts`:

```ts
// vite.config.ts
import { versionPlugin } from "@crescendolab/vite-plugin-version";
import { readPackage } from "read-pkg";
import { defineConfig } from "vite";

export default defineConfig(async () => {
  const pkg = await readPackage();

  return {
    plugins: [versionPlugin(pkg.version)],
  };
});
```

## Virtual Module Usage

Access the version at runtime using the virtual import:

```ts
// global.d.ts, if using TypeScript
/// <reference types="@crescendolab/vite-plugin-version/version" />

// app.ts
import VERSION from "virtual:version";

console.log(VERSION); // "1.0.0"
```

## Static Usage

The plugin also generates a `version` file in the output directory, making it easy to fetch and compare:

```ts
const result = await fetch(
  `${urlJoin(import.meta.env.BASE_URL, "version")}?t=${Date.now()}`,
  {
    cache: "no-cache",
  },
);
const fileVersion = await result.text(); // "1.0.0"
```

## Options

```ts
versionPlugin(version, options);
```

- `options.filename` (`string`, default: `"version"`):
  The name of the static version file generated in the output directory.

- `options.virtualModuleId` (`string`, default: `"virtual:version"`):
  The identifier of the virtual module used to import version information at runtime.

## Tips

Compare the version in the virtual module (`VERSION`) with the version in the static `version` file to reliably detect when a new version of your app is available.

## Demo

- [Code](https://github.com/crescendolab-open/vite-plugin-version/tree/main/packages/demo)
- [Live Demo](https://crescendolab-open.github.io/vite-plugin-version/)

## License

Copyright © 2025-preset Crescendo Lab Inc.

Licensed under the [Apache License, Version 2.0](https://github.com/crescendolab-open/vite-plugin-version/blob/main/LICENSE)
