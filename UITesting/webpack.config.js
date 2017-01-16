var webpack = require('webpack');
var path = require('path');

module.exports = {
  resolve: {
    extensions: ['','.js', '.jsx']
  },
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/dev-server",
    "./UITesting/index"
  ],
  module: {
    loaders: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: './UITesting',
    filename: "react.js",
    publicPath: '/'
  },
  devServer: {
    hot: true,
    contentBase: './UITesting'
  }
};
