import merge from "lodash.merge";
import carResolver from "./Car";
import userResolver from "./User";

const resolvers = merge({}, userResolver, carResolver);

export default resolvers;
