const { makeExecutableSchema, FilterTypes, transformSchema, RenameRootFields, RenameTypes, FilterRootFields }  = require('graphql-tools')
const { includes } = require('lodash')

export default [
  new FilterTypes(
    (name: string) => {
      // console.log(name)
      return true
      // return includes(['campaign','address','offer','business','campaignOffer'], name)
      // return rootField !== 'chirpsByAuthorId'
    }
  ),
  // new FilterRootFields(
  //   (operation: string, rootField: string) => {
  //     console.log(rootField)
  //     return includes(['campaign','address','offer','business','campaignOffer'], rootField)
  //     // return rootField !== 'chirpsByAuthorId'
  //   }
  // ),
  new RenameTypes((name:any) => {
    return ( name.indexOf('Condition') > 0 || name.indexOf('Filter') > 0 ) ? name : `pgl${name}`
  }),
  new RenameRootFields((operation:any, name:any) => `pgl${name}`),
]