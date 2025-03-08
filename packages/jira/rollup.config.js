import { readFileSync } from "node:fs";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

// Node.js built-ins to keep external
const builtins = [
	"fs",
	"path",
	"os",
	"crypto",
	"http",
	"https",
	"url",
	"util",
	"stream",
	"zlib",
	"child_process",
	"events",
	"assert",
	"buffer",
	"querystring",
	"readline",
	"tty",
];

// Keep @modelcontextprotocol/sdk external since it's a peer dependency
const externalPkgs = ["@modelcontextprotocol/sdk"];

export default {
	input: "src/index.ts",
	output: {
		file: "build/index.js",
		format: "cjs",
		banner: "#!/usr/bin/env node",
		sourcemap: false,
	},
	external: (id) => {
		// Keep Node.js built-ins external
		if (builtins.includes(id) || id.startsWith("node:")) return true;

		// Keep specific packages external
		if (externalPkgs.some((pkg) => id === pkg || id.startsWith(`${pkg}/`)))
			return true;

		return false;
	},
	plugins: [
		{
			name: "remove-shebang",
			transform(code, id) {
				if (id.includes("index.ts")) {
					return code.replace(/^#!.*/, "");
				}
			},
		},
		nodeResolve({
			preferBuiltins: true,
		}),
		commonjs(),
		json(),
		typescript({
			tsconfig: "./tsconfig.rollup.json",
			tsconfigOverride: {
				compilerOptions: {
					declaration: false,
					declarationMap: false,
				},
			},
		}),
	],
};
