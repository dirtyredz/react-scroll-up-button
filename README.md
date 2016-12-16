# react-scroll-up
React Component for a fixed scroll to top button.


## Install

```npm
npm install react-scroll-up-button
```

## Usage

###Default Button:   ![default_button](https://cloud.githubusercontent.com/assets/7119499/21240547/5c47751a-c2d1-11e6-9df8-5be7bbdd53de.png)
```jsx
import React from "react";
import ScrollUpButton from "react-scroll-up-button"; //Add this line Here

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <ScrollUpButton /> //Add this where ever you would like.
            </div>
        );
    }
}

```

###Custom Button:
```jsx
import React from "react";
import ScrollUp from "react-scroll-up-button";

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName: 'ScrollUpButton__Toggled'>
                    //Any JSX
                    //
                    //<span class="MyCustomButtonClass">UP</span>
                    //
                    //or
                    //
                    //<svg class="MyCustomButtonClass" viewBox="0 0 32 32" >
                    //  <path d="M19.196 23.429q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411zM19.196 16.571q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411z"></path>
                    //</svg>
                </ScrollUpButton>
            </div>
        );
    }
}
```


###Configuration:
```javascript
    {
        ContainerClassName: 'ScrollUpButton__Container', //Class name applied to the container when not using the default view
        StopPosition: 0,//Scroll position to stop at, 0 = top of page
        TransitionBtnPosition: 150,//at what scroll position value to show the button
        EasingType: 'easeOutCubic',//Easing option see : (https://www.npmjs.com/package/tween-functions) for available options
        AnimationDuration: 500,//MS duration of the scroll up event
        TransitionClassName: 'ScrollUpButton__Toggled',//Class name applied to the container to show the button when not using the default view
    }
```
###Themed Buttons:
####Default: 
![default_button](https://cloud.githubusercontent.com/assets/7119499/21240547/5c47751a-c2d1-11e6-9df8-5be7bbdd53de.png)
###More To Come Soon!!

###Requirments
```javascript
"dependencies": {
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
