import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList
} from 'graphql';

const userKeys = new GraphQLInputObjectType({
  name: 'userKeys',
  fields: {
    exchange: {
      type: new GraphQLEnumType({
        name: 'exchange',
        values: {
          KEY1: { value: "KEY1" },
          KEY2: { value: "KEY2" },
          KEY3: { value: "KEY3" }
        }
      })
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
