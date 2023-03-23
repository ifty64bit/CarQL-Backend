import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { GraphQLContext } from "./util/types";

dotenv.config();
const corsOptions = {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
};

//declare prisma instance
const prisma = new PrismaClient();

//declare express instance
const app = express();

//declare apollo server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    csrfPrevention: true,
});

try {
    await server.start();
} catch (error: any) {
    console.error(error.message);
}

app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }): Promise<GraphQLContext> => {
            return { prisma };
        },
    })
);

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});
