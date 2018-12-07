import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { printSchema } from 'graphql/utilities'
import { writeFileSync } from 'fs'
import { mergeTypes } from 'merge-graphql-schemas';

import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";
import mongooseSchema from './mongoose';

writeFileSync(`${__dirname}/../src/graphql/generated/mongoose.graphql`,printSchema(mongooseSchema), 'utf-8')

let executableSchema = makeExecutableSchema({
  typeDefs : [typeDefs([CustomScalars.keys()])],
  resolvers : {
    ...CustomScalars.values(),
    ...resolvers,
  },
})

export default executableSchema