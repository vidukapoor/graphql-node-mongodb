import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';

const userKeys = new GraphQLInputObjectType({
  name: 'userKeys',
  fields: {
    exchange: {
      type: GraphQLString
    },
    key: {
      type: GraphQLString
    },
    secret: {
      type: GraphQLString
    },
  }
})

export default new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    name: {
      type: GraphQLString
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    new_password: {
      type: GraphQLString
    },
    userKeys: {
      type: new GraphQLList(userKeys)
    }
  }
});
