const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { NormalModuleReplacementPlugin } = require("webpack");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

const getConfig = (language) => {
  return {
    entry: "./src/index.js",
    output: {
      filename: `bundle_${language}.js`,
      path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      alias: {
        svelte: path.resolve("node_modules", "svelte"),
      },
      extensions: [".mjs", ".js", ".svelte"],
      mainFields: ["svelte", "browser", "module", "main"],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(html|svelte)$/,
          use: {
            loader: "svelte-loader",
            options: {
              compilerOptions: {
                dev: !prod,
              },
              emitCss: prod,
              hotReload: !prod,
            },
          },
        },
        {
          // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new NormalModuleReplacementPlugin(
        /src\/assets\/i18n\.json/,
        path.resolve(__dirname, "i18n", `${language}.json`)
      ),
    ],
  };
};

module.exports = [ getConfig("pt"), getConfig("en") ];
