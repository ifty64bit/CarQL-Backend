import {
    PrismaClient,
    User as prismaUser,
    Vehicle as prismaVehicle,
    Comments as prismaComments,
} from "@prisma/client";

enum VehicleType {
    SUV = "SUV",
    Hatchback = "Hatchback",
    Crossover = "Crossover",
    Convertible = "Convertible",
    Sedan = "Sedan",
    Sport = "Sport",
    Coupe = "Coupe",
    Minivan = "Minivan",
    Wagon = "Wagon",
    Pickup = "Pickup",
    Van = "Van",
    Truck = "Truck",
}

enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}
export interface GraphQLContext {
    prisma: PrismaClient;
}

export interface VehicleImage {
    url: string;
    alt: string;
    isPrimary: boolean;
}

export interface User extends prismaUser {
    vehicles: Vehicle[];
    comments: Comment[];
}

export interface Vehicle extends prismaVehicle {
    user: User;
}

export interface Comment extends prismaComments {
    user: User;
    vehicle: Vehicle;
}
