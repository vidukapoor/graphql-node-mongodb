import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import BreweryType from './brewery';

export default new GraphQLObjectType({
  name: 'Beer',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    brewery: {
      type: BreweryType
    },
    alcohol: {
      type: GraphQLFloat
    },
    description: {
      type: GraphQLString
    }
  }
});
