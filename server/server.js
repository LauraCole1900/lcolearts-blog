var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;
import { typeDefs, resolvers } from './schemas/index.js';
import auth from './utils/auth.js';
import db from './config/connection.js';
const PORT = process.env.PORT || 3001;
function startApolloServer(resolvers, typeDefs) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        yield server.start();
        app.use("/graphql", cors(), json(), expressMiddleware(server, { context: auth.authMiddleware }));
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        // Serve up static assets
        if (process.env.NODE_ENV === "production") {
            app.use(express.static(path.join(__dirname, "../client/build")));
        }
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../client/build/index.html"));
        });
        db.once("open", () => {
            httpServer.listen(PORT, () => {
                console.log(`API server running on port ${PORT}!`);
                console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
            });
        });
    });
}
startApolloServer(resolvers, typeDefs);
