const webpack = require('webpack');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
            ],
          },
        },
      },
    ],
  },
  devtool: 'source-map',
  entry: {
    index: './example/app',
  },
  output: {
    path: __dirname,
    filename: 'react.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: __dirname,
    port: 8080,
  },
};
