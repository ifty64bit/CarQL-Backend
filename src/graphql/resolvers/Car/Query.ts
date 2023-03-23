import { Car, GraphQLContext } from "../../../util/types";

const queryResolver = {
    Query: {
        cars: async (
            _: any,
            args: { skip?: number; take?: number },
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            try {
                const data = await prisma.$transaction([
                    prisma.car.findMany({
                        skip: args.skip || 0,
                        take: args.take || 10,
                        include: {
                            user: true,
                        },
                    }),
                    prisma.car.count(),
                ]);

                return {
                    cars: data[0],
                    count: data[1],
                };
            } catch (error) {
                console.error(error);
                return { cars: [], count: 0 };
            }
        },
        filterdCars: async (
            _: any,
            args: Partial<Car>,
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            try {
                //TODO: Make this simpler
                const where: any = {};
                if (args.brand) {
                    where["brand"] = {
                        contains: args.brand,
                        mode: "insensitive",
                    };
                }
                if (args.model) {
                    where["model"] = {
                        contains: args.model,
                        mode: "insensitive",
                    };
                }
                if (args.year) {
                    where["year"] = {
                        gte: args.year,
                    };
                }
                if (args.color) {
                    where["color"] = {
                        contains: args.color,
                        mode: "insensitive",
                    };
                }
                if (args.price) {
                    where["price"] = {
                        lte: parseInt(args.price),
                    };
                }
                if (args.mileage) {
                    where["mileage"] = {
                        lte: parseInt(args.mileage),
                    };
                }
                if (args.transmission) {
                    where["transmission"] = {
                        equals: args.transmission,
                        mode: "insensitive",
                    };
                }
                if (args.engine) {
                    where["engine"] = {
                        equals: args.engine,
                        mode: "insensitive",
                    };
                }
                const data = await prisma.$transaction([
                    prisma.car.findMany({
                        where,
                        include: {
                            user: true,
                        },
                    }),
                    prisma.car.count({ where }),
                ]);
                console.log(data);

                return {
                    cars: data[0],
                    count: data[1],
                };
            } catch (error) {
                console.error(error);
                return { cars: [], count: 0 };
            }
        },
        car: async (_: any, args: any, context: GraphQLContext, info: any) => {
            return {};
        },
    },
};

export default queryResolver;
