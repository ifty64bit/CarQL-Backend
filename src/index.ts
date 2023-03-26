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
import upload from "./util/multer";
import { getServerSession } from "next-auth";

dotenv.config();
const corsOptions = {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
};

//declare prisma instance
const prisma = new PrismaClient();

//declare express instance
const app = express();

//declare public static folder
app.use(express.static("public"));

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

app.post(
    "/photos/upload",
    cors<cors.CorsRequest>(corsOptions),
    upload.array("photos", 12),
    function (req, res, next) {
        // req.files is array of `photos` files
        // req.body will contain the text fields, if there were any

        return res.status(200).json({
            message: "success",
            fileNames: (req.files as Array<Express.Multer.File>).map(
                (file) => ({
                    name: file.filename,
                    originalName: file.originalname,
                })
            ),
        });
    }
);

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
