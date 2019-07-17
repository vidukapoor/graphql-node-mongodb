import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';

import { tradesInput } from '../signal/signal-input'

const TradeInput= new GraphQLInputObjectType({
  name: 'TradeInput',
  fields: {
    tradeSignal: {
      type: tradesInput
    }
  }
});

export default TradeInput;
