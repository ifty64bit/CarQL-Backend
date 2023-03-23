const userTypeDef = `#graphql

enum Role {
    ADMIN
    USER
}

type User {
    id: String
    name: String
    email: String
    email_verified: String
    image: String
    phone: String
    role: Role
    address: String
    vehicles: [Vehicle]
    comments: [Comment]
}

type Query {
    user(id: String): User
}
`;

export default userTypeDef;
