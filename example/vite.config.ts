import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsolid from "../src/babel";

export default defineConfig({
	plugins: [
		solidPlugin({
			babel: {
				plugins: [
					// add here
					tsolid(),
				],
			},
		}),
	],
});
