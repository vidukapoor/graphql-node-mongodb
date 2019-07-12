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
          KEYONE: { value: "KEY1" },
          KEYTWO: { value: "KEY2" },
          KEYTHREE: { value: "KEY3" }
        }
      })
      // type: GraphQLString
    },
    key: {
      type: new GraphQLNonNull(GraphQLString)
    },
    secret: {
      type: new GraphQLNonNull(GraphQLString)
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
