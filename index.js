"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/cjs/react-scroll-up-button.min.js");
} else {
  module.exports = require("./dist/cjs/react-scroll-up-button.js");
}