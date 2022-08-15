"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _socket = require("socket.io");

var _expressGraphql = require("express-graphql");

var _schema = require("./schema");

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var server = (0, _http.createServer)(app);
var io = new _socket.Server(server, {
  cors: {
    origin: process.env.ORIGIN || ["http://localhost:3000", "http://localhost:3002"],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
  }
});
app.use(_express["default"].json());
app.use((0, _cors["default"])({
  origin: process.env.ORIGIN || ["http://localhost:3000", "http://localhost:3002"],
  credentials: false,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'authorization']
}));
app.use('/api-products', (0, _expressGraphql.graphqlHTTP)({
  graphiql: true,
  schema: _schema.schema,
  context: {}
}));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
  socket.on("create product", function () {
    io.emit("update list");
  });
  socket.on("update product", function () {
    io.emit("update list");
  });
  socket.on("delete product", function () {
    io.emit("update list");
  });
  socket.on('disconnect', function () {
    io.emit('chat message', "user disconect");
  });
});
var _default = server;
exports["default"] = _default;