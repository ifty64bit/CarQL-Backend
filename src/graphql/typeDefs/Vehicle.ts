const vehicleTypeDef = `#graphql

enum VehicleType {
    SUV
    Hatchback
    Crossover
    Convertible
    Sedan
    Sport
    Coupe
    Minivan
    Wagon
    Pickup
    Van
    Truck
}

type ErrorResponse {
    message: String
}

type MultipleVehicleResponse {
    Vehicles: [Vehicle]
    count: Int
}

union VehicleResponse = Vehicle | ErrorResponse

type VehicleImage {
    url:String
    name:String
    originalName:String
}

input VehicleImageInput {
    url:String!
    name:String!
    originalName:String!
    isPrimary:Boolean
}

type Comment {
    id: String
    comment: String
    vehicleId: String
    userId: String
    user: User
    vehicle: Vehicle
}


type Vehicle {
    id: String
    brand: String
    model: String
    year: Int
    color: String
    hourly_rate: Int
    mileage: Int
    transmission: String
    engine: String
    description: String
    type: VehicleType
    images: [VehicleImage]
    registration_number: String
    availability: Boolean
    views: Int
    tags: [String]
    userId: String
    user: User
    comments: [Comment]
}

input VehicleInput {
    brand: String!
    model: String!
    year: Int!
    color: String!
    hourly_rate: Int!
    mileage: Int!
    transmission: String!
    engine: String!
    description: String!
    type: VehicleType!
    images: [VehicleImageInput]
    registration_number: String!
    availability: Boolean!
    tags: [String]
    userId: String!
}

type Query {
    vehicles: MultipleVehicleResponse

    filterdVehicles(brand: String, model:String, year: Int, color:String, price: Int, mileage: Int, transmission: String, engine: String, user: String): MultipleVehicleResponse

    vehicle(id: String): Vehicle
}

type Mutation {
    createVehicle(vehicle: VehicleInput): Vehicle

    updateVehicle(id:String!, brand: String, model: String, year: Int, color: String, price: Int, mileage: Int, transmission: String, engine: String, description: String, image:[VehicleImageInput], user:String): VehicleResponse

    deleteVehicle(id: String): Vehicle

    createComment(comment: String!, vehicleId: String!, userId: String!): Comment

    updateComment(id: String!, comment: String!): Comment

    deleteComment(id: String!): Comment
}

`;

export default vehicleTypeDef;
