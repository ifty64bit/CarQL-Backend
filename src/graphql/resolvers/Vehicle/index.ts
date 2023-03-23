import mutationResolvers from "./Mutation";
import queryResolver from "./Query";

const vehicleResolver = {
    ...queryResolver,
    ...mutationResolvers
};

export default vehicleResolver;