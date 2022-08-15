"use strict";

var _app = _interopRequireDefault(require("./app.js"));

var _db = require("./db.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _db.Connect)();

_app["default"].listen(3001, function () {
  console.log('listening on *:3001');
});