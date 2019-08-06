const { merge } = require("lodash");
const config = require("./webpack.config");
const CleanWebPackPlugin = require("clean-webpack-plugin");

module.exports = merge(config, {
  mode: "production",
  optimization: {
    minimize: true
  },
  plugins: config.plugins.concat([new CleanWebPackPlugin(["dist"])])
});
