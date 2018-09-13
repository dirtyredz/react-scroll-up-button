var webpack = require('webpack');

module.exports = {
  mode: 'production',
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
                "babel-preset-env",
                {
                  "targets": {
                    "browsers": ["last 2 versions", "ie >= 11"]
                  },
                }
              ],
              "react"
            ]
          }
        }
      }
    ]
  },
  entry: {
    index: "./UITesting/testing",
  },
  output: {
    path: __dirname,
    filename: "react.js",
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: __dirname,
    port: 8080,
  }
};