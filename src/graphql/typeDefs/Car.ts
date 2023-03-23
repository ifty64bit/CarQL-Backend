const carTypeDef = `#graphql

type ErrorResponse {
    message: String
}

type MultipleCarResponse {
    cars: [Car]
    count: Int
}

union CarResponse = Car | ErrorResponse

type CarImage {
    url:String
    alt:String
    isPrimary:Boolean
}

input CarImageInput {
    url:String
    alt:String
    isPrimary:Boolean
}


type Car {
    id: String
    brand: String
    model: String
    year: Int
    color: String
    price: Int
    mileage: Int
    transmission: String
    engine: String
    description: String
    image: [CarImage]
    userId: String
    user: User
}

type Query {
    cars: MultipleCarResponse

    filterdCars(brand: String, model:String, year: Int, color:String, price: Int, mileage: Int, transmission: String, engine: String, user: String): MultipleCarResponse

    car(id: String): Car
}

type Mutation {
    createCar(brand: String!, model: String!, year: Int!, color: String!, price: Int!, mileage: Int!, transmission: String!, engine: String!, description: String!, image:[CarImageInput], user:String!): Car

    updateCar(id:String!, brand: String, model: String, year: Int, color: String, price: Int, mileage: Int, transmission: String, engine: String, description: String, image:[CarImageInput], user:String): CarResponse
}

`;

export default carTypeDef;
