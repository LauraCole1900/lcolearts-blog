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
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const http = require("http");
const cors = require("cors");
const { json } = require("body-parser");
var { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const PORT = process.env.PORT || 3001;
const { Express } = express;
const { Server } = http;
function startApolloServer(resolvers, typeDefs) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        yield server.start();
        app.use("/graphql", cors(), json(), expressMiddleware(server, { context: authMiddleware }));
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
