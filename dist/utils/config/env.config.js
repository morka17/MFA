"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    app: {
        port: process.env.PORT || 4000,
        env: process.env.NODE_ENV || 'development',
        name: process.env.APPNAME || "AUTH",
        domain: process.env.DOMAIN || "http://localhost:4000"
    },
    db: {
        port: process.env.DB_PORT || 5432,
    },
    mailer: {
        username: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD,
        email: process.env.SUPPORTEMAIL,
        APIKEY: process.env.MAILER_APIKEY
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: '1h',
    },
};
exports.default = config;
