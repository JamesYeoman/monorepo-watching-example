import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

import { cfg } from "@mwe/config/viteconfig";

export default defineConfig(({ command }) => {
	const config = cfg(command, __dirname);

	// The default jsx runtime is automatic, which adds a jsx script in the
	// bundle. The classic runtime doesn't have this. It's only dependent on react and react-dom
	config.plugins[0] = react({ jsxRuntime: "classic" });

	const entry = resolve(__dirname, "src", "index.tsx");

	// Global vars to use in UMD build for externalized deps
	const globals = { react: "React", "react-dom": "ReactDOM" };

	return {
		...config,
		build: {
			emptyOutDir: false,
			lib: { entry, fileName: "index", name: "shared" },
			outDir: "lib",
			rollupOptions: {
				external: ["react", "react-dom"],
				output: { globals }
			}
		}
	};
});
