var webpack = require('webpack');
var path = require('path');
var commonConfig = require('./webpack.common');

const prodConfig = {
  entry: {
    ScrollUp: "./src/react-scroll-up-button.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "react-scroll-up-button.js",
  },
};

module.exports = merge(commonConfig, prodConfig, { mode: 'production' });