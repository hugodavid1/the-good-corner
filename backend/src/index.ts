import "reflect-metadata";
import TagResolver from "./resolvers/TagsResolver";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./datasource";
import AdResolver from "./resolvers/AdsResolver";
import CategoriesResolver from "./resolvers/CategoriesResolver";
import UsersResolver from "./resolvers/UsersResolver";
import { ContextType, customAuthChecker } from "./auth";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

async function start() {
  const schema = await buildSchema({
    resolvers: [TagResolver, AdResolver, CategoriesResolver, UsersResolver],
    authChecker: customAuthChecker,
  });

  await dataSource.initialize();
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<ContextType>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: "http://localhost:3000",
      credentials: true,
    }),
    express.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async (args) => {
        return {
          req: args.req,
          res: args.res,
        };
      },
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 5000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:5000/`);
}

start();
