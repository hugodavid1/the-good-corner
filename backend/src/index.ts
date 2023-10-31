import "reflect-metadata";
import TagResolver from "./resolvers/TagsResolver";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { dataSource } from "./datasource";
import AdResolver from "./resolvers/AdsResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";

async function start() {
  const schema = await buildSchema({
    resolvers: [TagResolver, AdResolver, CategoryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  await dataSource.initialize();
  await startStandaloneServer(server, {
    listen: {
      port: 5000,
    },
  });

  console.log("🚀 Server started!");
}

start();