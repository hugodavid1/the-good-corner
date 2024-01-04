import "reflect-metadata";
import TagResolver from "./resolvers/TagsResolver";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./datasource";
import AdResolver from "./resolvers/AdsResolver";
import CategoriesResolver from "./resolvers/CategoriesResolver";
import UsersResolver from "./resolvers/UsersResolver";
import { customAuthChecker } from "./auth";

async function start() {
  const schema = await buildSchema({
    resolvers: [TagResolver, AdResolver, CategoriesResolver, UsersResolver],
    authChecker: customAuthChecker,
  });
  const server = new ApolloServer({
    schema,
  });

  await dataSource.initialize();
  await startStandaloneServer(server, {
    listen: {
      port: 5000,
    },
    context: async (args) => {
      return {
        req: args.req,
        res: args.res,
      };
    },
  });

  console.log("🚀 Server started!");
}

start();
