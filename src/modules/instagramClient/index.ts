import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";
import resolvers from './resolvers'

const typesArray = fileLoader('./src/modules/instagramClient/**/*.graphql');
typesArray.concat([CustomScalars.keys()])
let typeDefs =  mergeTypes(typesArray, { all: true })

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});