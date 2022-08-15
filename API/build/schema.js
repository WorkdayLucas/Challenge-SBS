"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;

var _schema = require("@graphql-tools/schema");

var _resolvers = require("./resolvers");

var typeDefs = ["\n  type Query {\n    products: [Product]\n  }\n\n  type Mutation {\n    createProduct(input: ProductInput): Product\n    deleteProduct(_id: ID): Product\n    updateProduct(_id: ID, input: ProductInput ): Product\n  }\n\n  type Product {\n    _id: ID\n    key: Int!\n    name: String!\n    description: String!\n    price: Int!\n    img: String! \n  }\n\n  input ProductInput {\n    name: String!\n    description: String!\n    price: Int!\n    img: String!\n  }\n\n"];
var schema = (0, _schema.makeExecutableSchema)({
  typeDefs: typeDefs,
  resolvers: _resolvers.resolvers
});
exports.schema = schema;