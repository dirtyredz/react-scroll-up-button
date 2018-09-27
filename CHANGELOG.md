#1.6.4
* **Dev:** Removed Babel-Polyfill in favor spread/babel compile (I should have noticed this before hand).

#1.6.3
* **Dev:** Removed Babel-Polyfill in favor of Object-Assign.

#1.6.2
* **React:** Added Transform attribute to default button for better styling.
* **Dev:** Added Babel-polyfill for object.assign polyfill, support for ie11.

#1.6.1
* **React:** Added catch if tween function tried to set scroll position past the stop position.
* **Test:** Updated all tests, and added e2e testing.
* **Dev:** Added cypress e2e testing and multiple package scripts for development and testing.
* **NPM:** Moved destination directory from lib/ to dist/

#1.6.0
* **React:** Moved themed buttons to exports

#1.5.11
* **React:** Added className overrides to the default button.

#1.5.10
* **NPM:** Replaced babel-preset-es2015 for babel-preset-env
* **NPM:** Updated React libraries
* **NPM:** Added enzyme-adapter-react
* **NPM:** Replaced react-addons-test-utils for react-test-renderer
* **NPM:** Added Node 8 for unit testing

#1.5.9

* **React:** Added Passive Events into listeners.
* **React:** Replaced React.PropTypes with Proptypes See https://facebook.github.io/react/docs/typechecking-with-proptypes.html
* **NPM:** Updated dependencies
* **NPM:** Added detect-passive-events
* **NPM:** Added prop-types

#1.5.6

* **NPM:** Updated README
* **GITHUB:** Added build coverage

#1.5.5

* **NPM:** Update README, minor variable scoping.
* **GITHUB:** Added build testing

#1.5.4

* **NPM:** Published 1.5.4
* **GITHUB:** Updated README.md fixed arrow up example

#1.5.2

* **NPM:** Removed un-needed dependency

#1.5.1

* **Compatibility:** no longer requires a style-loader
* **NPM:** Removed .css file
* **GITHUB:** Added CHANGELOG.md
