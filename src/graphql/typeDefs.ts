import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader('./src/graphql/**/*.graphql');
let typeDefs =  mergeTypes(typesArray, { all: true })

export default typeDefs