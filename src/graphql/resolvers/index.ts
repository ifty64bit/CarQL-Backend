import merge from "lodash.merge";
import vehicleResolver from "./Vehicle";
import userResolver from "./User";
import commentResolver from "./Comment";

const resolvers = merge({}, userResolver, vehicleResolver, commentResolver);

export default resolvers;
