

import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';

const portfolioInput = new GraphQLInputObjectType({
  name: 'portfolio',
  fields: {
    asset: {
      type: GraphQLFloat
    },
    currency: {
      type: GraphQLFloat
    }
  }
});

const tradesInput = new GraphQLInputObjectType({
  name: 'tradeList',
  fields: {
    id: {
      type: GraphQLString
    },
    adviceId: {
      type: GraphQLString
    },
    action: {
      type: GraphQLString
    },
    cost: {
      type: GraphQLFloat
    },
    amount: {
      type: GraphQLFloat
    },
    price: {
      type: GraphQLString
    },
    balance: {
      type: GraphQLFloat
    },
    date: {
      type: GraphQLString
    },
    effectivePrice: {
      type: GraphQLString
    },
    feePercent: {
      type: GraphQLFloat
    },
    portfolio: {
      type: portfolioInput
    },
  }
});

const SignalInput= new GraphQLInputObjectType({
  name: 'SignalInput',
  fields: {
    asset: {
      type: new GraphQLNonNull(GraphQLString)
    },
    currency: {
      type: new GraphQLNonNull(GraphQLString)
    },
    exchange: {
      type: new GraphQLNonNull(GraphQLString)
    },
    strategy: {
      type: new GraphQLNonNull(GraphQLString)
    },
    reference: {
      type: new GraphQLNonNull(GraphQLString)
    },
    stakeAmount: {
      type: new GraphQLNonNull(GraphQLString)
    },
    trades: {
      type: new GraphQLList(tradesInput)
    }
  }
});

export default SignalInput;

// put this to the trade inputType
export { tradesInput };