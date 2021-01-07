var path = require("path");
var webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const frontendConfig = {
  mode: "development",
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "js/build"),
    filename: "main.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
};

const backendConfig = {
  mode: "development",
  target: "node",
  context: path.resolve(__dirname),
  entry: {
    app: ["./server/server.js"],
  },
  output: {
    path: path.resolve(__dirname, "server/build"),
    filename: "server.bundle.js",
  },
  externals: [nodeExternals()],
};

module.exports = [frontendConfig, backendConfig];
