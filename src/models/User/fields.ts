import { TypeComposer } from "graphql-compose";

export default function(params:any){

  let { TC } = params
  
  TC.addFields({
    // lonLat: TypeComposer.create('type LonLat { lon: Float, lat: Float }'),
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