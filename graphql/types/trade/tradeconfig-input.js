import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';

const round_config_data = new GraphQLInputObjectType({
  name: 'RoundConfigInput',
  fields:{
    waiting_time: {
      type: new GraphQLList(GraphQLString)
    },
    time_in_force: {
      type: new GraphQLEnumType({
        name: 'timeinforce',
        values: {
          GTC: { value: "GTC" },
          FOK: { value: "FOK" },
          IOC: { value: "IOC" }
        }
      })
    },
  }
});
const TradeConfigInput = new GraphQLInputObjectType({
  name: 'TradeConfigInput',
  fields: {
    user_ids: {
      type: new GraphQLList(GraphQLString)
    },
    round_config: {
      type: new GraphQLNonNull(new GraphQLList(round_config_data))
    },
    exposure_time: {
      type: GraphQLString
    },
    start_time: {
      type: GraphQLString
    },
    end_time: {
      type: GraphQLString
    },
    asset: {
      type: new GraphQLNonNull(GraphQLString)
    },
    currency: {
      type: new GraphQLNonNull(GraphQLString)
    },
    fallback_config_id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    isActive: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    level: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  }
});

export default TradeConfigInput;
