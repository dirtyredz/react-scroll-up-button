var webpack = require('webpack');
var path = require('path');

module.exports = {
  resolve: {
    extensions: ['','.js', '.jsx']
  },
  entry: "./UnitTesting/index",
  module: {
    loaders: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }
    ]
  },
  output: {
    path: __dirname,
    filename: "react.js"
  }
};
