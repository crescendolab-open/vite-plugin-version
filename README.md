# Vite Plugin Version

A Vite plugin to inject version information into the build.

## Installation

Install the plugin using the package manager:

```bash
pnpm add @crescendolab/vite-plugin-version
```

## Usage

Add the plugin to the `vite.config.ts` file:

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

### Result

The plugin generates a `version` file containing the application's version:

```json
{
  "version": "1.0.0"
}
```

## Runtime Usage

Access the version at runtime using the virtual module `virtual:version`:

```ts
// global.d.ts
/// <reference types="@crescendolab/vite-plugin-version/version" />

// app.ts
import VERSION from "virtual:version";

console.log(VERSION); // "1.0.0"
```

## License

Copyright © 2025-preset Crescendo Lab Inc.

Licensed under the [Apache License, Version 2.0](https://github.com/crescendolab-open/vite-plugin-version/blob/main/LICENSE)
