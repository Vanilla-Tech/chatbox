const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
      filename: "mtachat.min.js"
    },
    optimization: {
      minimizer: [new CompressionPlugin()],
      splitChunks: false
    }
  }
};
