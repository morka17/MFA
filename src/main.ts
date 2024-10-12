import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';
import { createServer } from "http"
import { WebSocketServer } from "ws"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { useServer } from 'graphql-ws/lib/use/ws';
import schema from "./utils/schema";
import prismaClient from "./utils/prisma";
import { MyContext, User } from "./utils/context";
import { jwtDecode } from "./utils/jwt";
import * as client from 'prom-client';
import logger from "./utils/logger";



const app = express()
const httpServer = createServer(app)



app.use(cookieParser())




// Create a new registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });



// WebSocket server for subscriptions
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});



const serverCleanup = useServer({
    schema,
    context: async (ctx) => {

        const { connectionParams } = ctx

        // Simulate a req object from connectionParams
        const req = {
            headers: {
                authorization: connectionParams?.Authorization
            },
            cookies: {
                token: connectionParams?.token
            }
        };

        return {
            req: req,
            res: null,
            user: null,
            prisma: prismaClient
        }
    },
}, wsServer);

const server = new ApolloServer<MyContext>({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        // Proper shutdown for the WebSocket server 
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            }
        }
    ],
})


async function main() {

    await server.start()

    app.use("/graphql", bodyParser.json(), expressMiddleware(server, {
        context: async ({ req, res }: { req: express.Request, res: express.Response }) => ({
            req: req,
            res: res,
            user: null,
            // user: jwtDecode<Omit<User, "password">>(req.headers.authorization?.split(" ")[1] ?? ""),
            prisma: prismaClient

        })
    }))

    // ROUTES 
    // app.use("/v1/api/payment", bodyParser.json(), paymentRouter)
    // Health check route
    app.get('/v1/api/health', (req, res) => {
        logger.info({ req, message: 'Checking system\'s health' });
        res.status(200).json({ status: 'ok' });
    });

    // Expose the metrics at the /metrics endpoint
    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    });


    httpServer.listen(3000, () => {
        console.log(`server ready at http://localhost:3000/graphql`)
        console.log(`ws ready at ws://localhost:3000/graphql`)
    })
}

// MAIN SERVER 
main()
