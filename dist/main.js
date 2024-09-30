"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const ws_1 = require("ws");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const ws_2 = require("graphql-ws/lib/use/ws");
const schema_1 = __importDefault(require("./utils/schema"));
const prisma_1 = __importDefault(require("./utils/prisma"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cookie_parser_1.default)());
// WebSocket server for subscriptions
const wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
const serverCleanup = (0, ws_2.useServer)({
    schema: schema_1.default,
    context: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { connectionParams } = ctx;
        // Simulate a req object from connectionParams
        const req = {
            headers: {
                authorization: connectionParams === null || connectionParams === void 0 ? void 0 : connectionParams.Authorization
            },
            cookies: {
                token: connectionParams === null || connectionParams === void 0 ? void 0 : connectionParams.token
            }
        };
        return {
            req: req,
            res: null,
            user: null,
            prisma: prisma_1.default
        };
    }),
}, wsServer);
const server = new server_1.ApolloServer({
    schema: schema_1.default,
    plugins: [
        (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
        // Proper shutdown for the WebSocket server 
        {
            serverWillStart() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        drainServer() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield serverCleanup.dispose();
                            });
                        },
                    };
                });
            }
        }
    ],
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        app.use("/graphql", body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, {
            context: ({ req, res }) => __awaiter(this, void 0, void 0, function* () {
                return ({
                    req: req,
                    res: res,
                    user: null,
                    // user: jwtDecode<Omit<User, "password">>(req.headers.authorization?.split(" ")[1] ?? ""),
                    prisma: prisma_1.default
                });
            })
        }));
        // ROUTES 
        // app.use("/v1/api/payment", bodyParser.json(), paymentRouter)
        // Health check route
        app.get('/v1/api/health', (req, res) => {
            res.status(200).json({ status: 'ok' });
        });
        httpServer.listen(3000, () => {
            console.log(`server ready at http://localhost:3000/graphql`);
            console.log(`ws ready at ws://localhost:3000/graphql`);
        });
    });
}
// MAIN SERVER 
main();
