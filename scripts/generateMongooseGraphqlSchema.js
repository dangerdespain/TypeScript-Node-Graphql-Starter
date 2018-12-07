const { printSchema } = require('graphql/utilities')
const { writeFileSync } = require('fs')
const mongooseSchema = require('../dist/graphql/Mongoose');

writeFileSync(`${__dirname}/../generated/mongoose.graphql`,printSchema(mongooseSchema), 'utf-8')
process.exit(0)