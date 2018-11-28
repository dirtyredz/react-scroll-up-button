import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const input = "src/react-scroll-up-button.js";

const babelOptionsCJS = {
  exclude: /node_modules/
};

const babelOptionsESM = {
  exclude: /node_modules/,
  runtimeHelpers: true,
  plugins: [["@babel/transform-runtime", { useESModules: true }]]
};

const external = id => !id.startsWith(".") && !id.startsWith("/");

export default [
  {
    input,
    output: { file: `dist/cjs/${pkg.name}.js`, format: "cjs" },
    external,
    plugins: [
      babel(babelOptionsCJS),
      replace({ "process.env.NODE_ENV": JSON.stringify("development") })
    ]
  },

  {
    input,
    output: { file: `dist/cjs/${pkg.name}.min.js`, format: "cjs" },
    external,
    plugins: [
      babel(babelOptionsCJS),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      terser()
    ]
  },

  {
    input,
    output: { file: `dist/esm/${pkg.name}.js`, format: "esm" },
    external,
    plugins: [babel(babelOptionsESM), sizeSnapshot()]
  },
];