import { GraphQLContext, Vehicle } from "../../../util/types";

const mutationResolvers = {
    Mutation: {
        createVehicle: async (
            _: any,
            args: { vehicle: Vehicle },
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            const { vehicle } = args;
            try {
                return await prisma.vehicle.create({
                    data: {
                        brand: vehicle.brand,
                        model: vehicle.model,
                        year: vehicle.year,
                        color: vehicle.color,
                        hourly_rate: vehicle.hourly_rate,
                        mileage: vehicle.mileage,
                        description: vehicle.description,
                        engine: vehicle.engine,
                        transmission: vehicle.transmission,
                        type: vehicle.type,
                        registration_number: vehicle.registration_number,
                        availability: vehicle.availability,
                        views: vehicle.views,
                        tags: vehicle.tags,
                        user: {
                            connect: {
                                id: vehicle.userId,
                            },
                        },
                    },
                });
            } catch (error) {
                console.error(error);
                return { message: "Something Went Wrong" };
            }
        },

        updateVehicle: async (
            _: any,
            args: Partial<Vehicle>,
            context: GraphQLContext,
            info: any
        ) => {
            const { prisma } = context;
            if (!args.id) {
                return { message: "No Id Provided" };
            }
            try {
                const updatedVehicle: any = {};
                // Object.keys(args).forEach((key) => {
                //     if (key) {
                //         updatedVehicle[key] = args[key];
                //     }
                // });
                if (args.brand) {
                    updatedVehicle["brand"] = args.brand;
                }
                if (args.model) {
                    updatedVehicle["model"] = args.model;
                }
                if (args.year) {
                    updatedVehicle["year"] = args.year;
                }
                if (args.color) {
                    updatedVehicle["color"] = args.color;
                }
                if (args.hourly_rate) {
                    updatedVehicle["hourly_rate"] = args.hourly_rate;
                }
                if (args.mileage) {
                    updatedVehicle["mileage"] = args.mileage;
                }
                if (args.transmission) {
                    updatedVehicle["transmission"] = args.transmission;
                }
                if (args.engine) {
                    updatedVehicle["engine"] = args.engine;
                }
                if (args.description) {
                    updatedVehicle["description"] = args.description;
                }
                if (args.user) {
                    updatedVehicle["user"] = {
                        connect: { id: args.user },
                    };
                }

                const data: any = await prisma.vehicle.update({
                    where: { id: args.id },
                    data: updatedVehicle,
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

        deleteVehicle: async (
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
                return await prisma.vehicle.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(error);
                return { message: "Something Went Wrong" };
            }
        },
    },
};

export default mutationResolvers;
