import { build, emptyDir } from "https://deno.land/x/dnt@0.31.0/mod.ts";
import { copy, walk } from "https://deno.land/std@0.162.0/fs/mod.ts";

await emptyDir("./npm");
await Deno.mkdir("./npm/script/src", { recursive: true });
await copy("src/fixtures", "./npm/script/src/fixtures", { overwrite: true });
await Deno.mkdir("./npm/esm/src", { recursive: true });
await copy("src/fixtures", "./npm/esm/src/fixtures", { overwrite: true });


await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: "dev",
  },
  compilerOptions: {
    lib: ["es2021", "dom"],
  },
  package: {
    // package.json properties
    name: "simple-lndconnect",
    version: Deno.args[0],
    description: "LNDConnect URL parser for node, deno and browsers",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/runcitadel/deno-lndconnect.git",
    },
    bugs: {
      url: "https://github.com/runcitadel/deno-lndconnect/issues",
    },
  },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
await Deno.remove("./npm/script/src/fixtures", { recursive: true });
await Deno.remove("./npm/esm/src/fixtures", { recursive: true });
