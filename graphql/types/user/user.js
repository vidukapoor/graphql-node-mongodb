import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';


export default new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    // userKeys: {
    //   type: GraphQLList
    // }
  }
});
