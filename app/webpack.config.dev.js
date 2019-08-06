const webpack = require("webpack");
const { merge } = require("lodash");
const config = require("./webpack.config");
const path = require("path");

module.exports = merge(config, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    historyApiFallback: true,
    hot: true,
    disableHostCheck: true
  },
  plugins: config.plugins.concat([new webpack.HotModuleReplacementPlugin()])
});
