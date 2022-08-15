"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var productSchema = new _mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  img: {
    type: String,
    require: true
  },
  key: {
    type: Number,
    require: true
  }
});

var _default = (0, _mongoose.model)("Product", productSchema);

exports["default"] = _default;