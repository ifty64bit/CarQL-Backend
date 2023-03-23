import { PrismaClient } from "@prisma/client";

export interface GraphQLContext {
    prisma: PrismaClient;
}

export interface CarImage {
    url: string;
    alt: string;
    isPrimary: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    email_verified: boolean;
    image: string;
}

export interface Car {
    id: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    price: string;
    mileage: string;
    transmission: string;
    engine: string;
    description: string;
    image: [CarImage];
    user: User | string;
}
