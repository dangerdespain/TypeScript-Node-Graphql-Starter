import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";
// import resolvers from './resolvers'
import Mutation from './mutations'
import Query from './queries'

const typesArray = fileLoader('./src/modules/session/**/*.graphql');
console.log(typesArray)
typesArray.concat([CustomScalars.keys()])
let typeDefs =  mergeTypes(typesArray, { all: true })

export default makeExecutableSchema({
  typeDefs,
  resolvers : {
    Mutation,
    Query
  },
});