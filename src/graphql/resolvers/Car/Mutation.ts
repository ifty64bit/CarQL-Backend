import { Car, GraphQLContext } from "../../../util/types";

const mutationResolvers = {
    Mutation: {
        createCar: async (
            _: any,
            args: Car,
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            try {
                return await prisma.car.create({
                    data: {
                        brand: args.brand,
                        model: args.model,
                        year: args.year,
                        color: args.color,
                        price: parseInt(args.price),
                        mileage: parseInt(args.mileage),
                        transmission: args.transmission,
                        engine: args.engine,
                        description: args.description,
                        user: { connect: { id: args.user as string } },
                    },
                });
            } catch (error) {
                console.error(error);
                return { message: "Something Went Wrong" };
            }
        },

        updateCar: async (
            _: any,
            args: Partial<Car>,
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            if (!args.id) {
                return { message: "No Id Provided" };
            }
            try {
                const updatedCar: any = {};
                if (args.brand) {
                    updatedCar["brand"] = args.brand;
                }
                if (args.model) {
                    updatedCar["model"] = args.model;
                }
                if (args.year) {
                    updatedCar["year"] = args.year;
                }
                if (args.color) {
                    updatedCar["color"] = args.color;
                }
                if (args.price) {
                    updatedCar["price"] = parseInt(args.price);
                }
                if (args.mileage) {
                    updatedCar["mileage"] = parseInt(args.mileage);
                }
                if (args.transmission) {
                    updatedCar["transmission"] = args.transmission;
                }
                if (args.engine) {
                    updatedCar["engine"] = args.engine;
                }
                if (args.description) {
                    updatedCar["description"] = args.description;
                }
                if (args.user) {
                    updatedCar["user"] = {
                        connect: { id: args.user as string },
                    };
                }

                const data: any = await prisma.car.update({
                    where: { id: args.id },
                    data: updatedCar,
                    include: {
                        user: true,
                    },
                });

                data["__typename"] = "Car";
                return data;
            } catch (error) {
                console.error(error);
                return {
                    message: "Something Went Wrong",
                    __typename: "ErrorResponse",
                };
            }
        },
    },
};

export default mutationResolvers;
