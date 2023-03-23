import { Vehicle, GraphQLContext } from "../../../util/types";

const queryResolver = {
    Query: {
        vehicles: async (
            _: any,
            args: { skip?: number; take?: number },
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            try {
                const data = await prisma.$transaction([
                    prisma.vehicle.findMany({
                        skip: args.skip || 0,
                        take: args.take || 10,
                        include: {
                            user: true,
                        },
                    }),
                    prisma.vehicle.count(),
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
        filterdVehicles: async (
            _: any,
            args: Partial<Vehicle>,
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
                        lte: args.price,
                    };
                }
                if (args.mileage) {
                    where["mileage"] = {
                        lte: args.mileage,
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
                    prisma.vehicle.findMany({
                        where,
                        include: {
                            user: true,
                        },
                    }),
                    prisma.vehicle.count({ where }),
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
        vehicle: async (
            _: any,
            args: { id: string },
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            try {
                const data = await prisma.vehicle.update({
                    where: { id: args.id },
                    include: {
                        user: true,
                    },
                    data: {
                        views: { increment: 1 },
                    }
                });
                return data;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    },
};

export default queryResolver;
