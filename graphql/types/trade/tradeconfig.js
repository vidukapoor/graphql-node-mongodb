import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';

const round_config_data = new GraphQLObjectType({
  name: 'RoundConfig',
  fields:{
    waiting_time: {
      type: new GraphQLList(GraphQLString)
    },
    time_in_force: {
      type: GraphQLString
    },
  }
});
const TradeConfigInput = new GraphQLObjectType({
  name: 'TradeConfig',
  fields: {
    user_ids: {
      type: new GraphQLList(GraphQLString)
    },
    round_config: {
      type: new GraphQLList(round_config_data)
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
      type: GraphQLString
    },
    currency: {
      type: GraphQLString
    },
    fallback_config_id: {
      type: GraphQLString
    },
    isActive: {
      type: GraphQLBoolean
    },
    level: {
      type: GraphQLInt
    }
  }
});

export default TradeConfigInput;
