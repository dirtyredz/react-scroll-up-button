var webpack = require('webpack');
var path = require('path');
const merge = require("webpack-merge");
const commonConfig = require("../webpack.common");

const devConfig = {
  mode: 'development',
  devtool: "source-map",
  entry: {
    index: "./UITesting/index",
  },
  output: {
    path: __dirname,
    filename: "react.js",
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: __dirname,
    port: 8080,
  }
};
module.exports = merge(commonConfig, devConfig, { mode: 'development' });