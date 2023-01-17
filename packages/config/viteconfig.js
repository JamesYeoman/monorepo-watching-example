const react = require("@vitejs/plugin-react");
const { default: checker } = require("vite-plugin-checker");
const { default: envCompatible } = require("vite-plugin-env-compatible");
const { createHtmlPlugin } = require("vite-plugin-html");
const viteSvgr = require("vite-plugin-svgr");
const { default: tsconfigPaths } = require("vite-tsconfig-paths");

const flexbugsFixes = require("postcss-flexbugs-fixes");
const normalize = require("postcss-normalize");
const presetEnv = require("postcss-preset-env");

const cfg = (command, root, htmlEnv = {}) => {
  const envPrefix = "REACT_APP_";

  const checkerOpts = {
    typescript: true,
    eslint: { lintCommand: `eslint ${root}/src/**/*.{js,jsx,ts,tsx}` },
  };

  const htmlOpts = {
    inject: { data: { env: htmlEnv } },
    minify: command === "build",
  };

  const plugins = [
    react({ jsxRuntime: "classic" }),
    envCompatible({ prefix: envPrefix }),
    createHtmlPlugin(htmlOpts),
    viteSvgr(),
    checker(checkerOpts),
    tsconfigPaths(),
  ];

  const postcss = {
    plugins: [
      flexbugsFixes(),
      presetEnv({ autoprefixer: { flexbox: "no-2009" }, stage: 3 }),
      normalize(),
    ],
  };

  return {
    css: { postcss, devSourcemap: true },
    envPrefix: "REACT_APP_",
    plugins,
    server: { open: true },
  };
};

module.exports = { cfg };
