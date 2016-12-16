"autoprefixer-loader": "^3.2.0",
"babel-core": "^6.17.0",
"babel-loader": "^6.2.0",
"babel-plugin-add-module-exports": "^0.1.2",
"babel-plugin-react-html-attrs": "^2.0.0",
"babel-plugin-transform-class-properties": "^6.3.13",
"babel-plugin-transform-decorators-legacy": "^1.3.4",
"babel-preset-es2015": "^6.3.13",
"babel-preset-react": "^6.3.13",
"babel-preset-stage-0": "^6.3.13",
"css-loader": "^0.26.1",
"extract-text-webpack-plugin": "^1.0.1",
"react": "^0.14.6",
"style-loader": "^0.13.1",
"tween-functions": "^1.2.0",
}
```


####Webpack
```javascript
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
stats: {
children: false
},
context: path.join(__dirname, "src"),
devtool: debug ? "inline-sourcemap" : null,
entry: "./js/react.js",
module: {
loaders: [
    {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader?modules&importLoaders=1&localIdentName=' +
        ' [name]__[local]___[hash:base64:5]&-minifyFontValues',
        'autoprefixer-loader?{browsers: ["last 2 versions", ' +
        '"> 1%", "ie 9", "firefox >= 21", "safari >= 5"], cascade: false}',
      ].join('!')),
    }
]
},
output: {
path: __dirname + "/src/",
filename: "react.min.js"
},
plugins: debug ? [
new ExtractTextPlugin('react.css'),
] : [
new ExtractTextPlugin('react.css'),
new webpack.optimize.DedupePlugin(),
new webpack.optimize.OccurenceOrderPlugin(),
new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
],
};
```
