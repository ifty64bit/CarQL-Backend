import { GraphQLContext } from "../../util/types";

const userResolver = {
    Query: {
        user: async (_: any, args: any, context: GraphQLContext, info: any) => {
            const { prisma } = context;
            try {
                return await prisma.user.findFirst({
                    where: { name: "Ifty Islam" },
                });
            } catch (error) {
                return { message: "Something Went Wrong" };
            }
        },
    },
    Mutation: {
        
    },
    // Subscription: {},
};

export default userResolver;
