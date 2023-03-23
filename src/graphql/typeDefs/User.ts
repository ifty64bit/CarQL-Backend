const userTypeDef = `#graphql

type User {
    id: String
    name: String
    email: String
    email_verified: Boolean
    image: String
}

type Query {
    user(id: String): User
}
`;

export default userTypeDef;
