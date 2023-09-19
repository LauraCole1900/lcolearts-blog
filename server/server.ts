import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { typeDefs, resolvers } from "./schemas/index.js";
import { Resolvers } from "./tsdefs";
import auth from "./utils/auth.js";
import db from "./config/connection.js";

interface MyContext {
  token?: String;
}

const PORT: string | 3001 = process.env.PORT || 3001;

const app = express();
const httpServer = http.createServer(app);

db.once("open", (): void => {
  console.log("firing");
  httpServer.listen(PORT, (): void => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});

async function startApolloServer(
  resolvers: Resolvers,
  typeDefs: string
): Promise<void> {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, { context: auth.authMiddleware })
  );

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res): void => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

startApolloServer(resolvers, typeDefs);
