"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenExpired = exports.jwtVerify = exports.jwtDecode = exports.jwtEncode = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const graphql_1 = require("graphql");
const env_config_1 = __importDefault(require("./config/env.config"));
const { jwt } = env_config_1.default;
function jwtEncode(args, expiresIn) {
    const token = (0, jsonwebtoken_1.sign)(args, jwt.secret, { expiresIn: jwt.expiresIn || '3h' });
    return token;
}
exports.jwtEncode = jwtEncode;
function jwtDecode(token) {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, jwt.secret);
        return decoded;
    }
    catch (err) {
        return null;
    }
}
exports.jwtDecode = jwtDecode;
function jwtVerify(token) {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, jwt.secret);
        return decoded;
    }
    catch (err) {
        throw new graphql_1.GraphQLError("Invalid Session Token", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 }
            }
        });
    }
}
exports.jwtVerify = jwtVerify;
const isTokenExpired = (jwtPayload) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime >= jwtPayload.exp;
};
exports.isTokenExpired = isTokenExpired;
