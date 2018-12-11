import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { printSchema } from 'graphql/utilities'
import { writeFileSync } from 'fs'
import { mergeTypes } from 'merge-graphql-schemas';

import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";
// import mongooseSchema from '../modules/mongoose';
// import postgraphileSchema from '../modules/postgraphile';

// writeFileSync(`${__dirname}/../src/generated/mongoose.graphql`,printSchema(mongooseSchema), 'utf-8')
// writeFileSync(`${__dirname}/../src/generated/postgrahile.graphql`,printSchema(postgraphileSchema), 'utf-8')

let executableSchema = makeExecutableSchema({
  typeDefs : [...CustomScalars.keys(), ...typeDefs()],
  resolvers : {
    ...CustomScalars.values(),
    ...resolvers,
  },
})

export default executableSchema