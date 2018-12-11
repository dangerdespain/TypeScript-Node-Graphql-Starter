import { TypeComposer } from "graphql-compose";

export default function(TC:any){

  TC.addFields({
    // lonLat: TypeComposer.create('type LonLat { lon: Float, lat: Float }'),
    id : { type : 'ID', resolve({ _id, id }:any){ return id ? id : _id } },
    notice: 'String', 
    noticeList: { 
      type: '[String]', 
      description: 'Array of notices',
      resolve: (root:any, args:any, context:any, info:any) => ['some value'],
    },
    // bio: {
      //   type: GraphQLString,
      //   description: 'Providing vanilla GraphQL type'
      // }
    // })
  })

  return TC

}