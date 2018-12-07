// const { postgraphile, watchPostGraphileSchema, withPostGraphileContext } = require("postgraphile");
// const { sequelize, jwtauth } = require('../../config')
// const schema = require('./schema')
// const { graphql } = require('graphql')
// const { Pool } = require('pg')

// let pgPool = new Pool(sequelize)

// const performQuery = async function({
//   // schema,
//   query,
//   variables,
//   jwtToken,
//   operationName
// }){
//   return await withPostGraphileContext({
//     pgPool,
//     jwtToken,
//     jwtSecret: jwtauth.secret,
//     pgDefaultRole: sequelize.username
//   }, 
//     async context => {
//       return graphql(
//         schema.default, // The schema from `createPostGraphileSchema`
//         query,
//         null,
//         context, // You can add more to context if you like
//         variables,
//         operationName
//       )
//     }
//   )
// }

// module.exports = performQuery