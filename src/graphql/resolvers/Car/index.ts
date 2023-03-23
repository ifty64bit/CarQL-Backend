import mutationResolvers from "./Mutation";
import queryResolver from "./Query";

const carResolver = {
    ...queryResolver,
    ...mutationResolvers
};

export default carResolver;