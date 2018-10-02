const webpack = require('webpack');

module.exports = {
  mode: 'production',
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
  entry: {
    index: './tests/server/testing',
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
    port: 8000,
  },
};
