import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";

export default (additionalTypes:any=[])=>{
  const typesArray = fileLoader('./src/graphql/**/*.graphql');
  typesArray.concat(additionalTypes)
  typesArray.concat([CustomScalars.keys()])
  let typeDefs =  mergeTypes(typesArray, { all: true })
  return typeDefs
}