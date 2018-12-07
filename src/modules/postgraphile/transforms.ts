const { makeExecutableSchema, transformSchema, RenameRootFields, RenameTypes }  = require('graphql-tools')

export default [
  // new FilterRootFields(
  //   (operation: string, rootField: string) => rootField !== 'chirpsByAuthorId'
  // ),
  new RenameTypes((name:any) => {
    return ( name.indexOf('Condition') > 0 || name.indexOf('Filter') > 0 ) ? name : `pgl${name}`
  }),
  new RenameRootFields((operation:any, name:any) => `pgl${name}`),
]