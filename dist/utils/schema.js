"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@graphql-tools/schema");
const email_schema_1 = __importDefault(require("../features/authentications/email_based/email.schema"));
const typeDefs = [email_schema_1.default];
const resolvers = [];
let schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
// // Auth directive transformation 
// schema = authDirectiveTransformer(schema, 'auth');
exports.default = schema;
