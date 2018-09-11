var webpack = require('webpack');
var path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "babel-preset-env"
              ]
            ]
          }
        }
      }
    ]
  }
};
