import { defineConfig } from "vite";

import { cfg } from "@mwe/config/viteconfig";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	const config = cfg(command, __dirname);
	config.server.port = 3000;

	return {
		...config,
		build: { outDir: "build", sourcemap: false }
	};
});
