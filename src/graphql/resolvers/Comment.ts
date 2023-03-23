import { Comment, GraphQLContext } from "../../util/types";

const commentResolver = {
    Mutation: {
        createComment: async (
            _: any,
            args: Omit<Comment, "id">,
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            console.log(args);

            try {
                return await prisma.comments.create({
                    data: {
                        comment: args.comment,
                        vehicle: {
                            connect: {
                                id: args.vehicleId,
                            },
                        },
                        user: {
                            connect: {
                                id: args.userId,
                            },
                        },
                    },
                    include: {
                        user: true,
                    },
                });
            } catch (error) {
                console.error(error);
                return { message: "Something Went Wrong" };
            }
        },
        updateComment: async (
            _: any,
            args: { id: string; comment: string },
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            if (!args.id) {
                return { message: "No Id Provided" };
            }
            try {
                return await prisma.comments.update({
                    where: { id: args.id },
                    data: { comment: args.comment },
                });
            } catch (error) {
                console.error(error);
                return { message: "Something Went Wrong" };
            }
        },
        deleteComment: async (
            _: any,
            args: { id: string },
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            if (!args.id) {
                return { message: "No Id Provided" };
            }
            try {
                return await prisma.comments.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(error);
                return { message: "Something Went Wrong" };
            }
        },
    },
};

export default commentResolver;
