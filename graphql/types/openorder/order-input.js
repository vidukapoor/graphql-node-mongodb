import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';

const list = new GraphQLInputObjectType({
  name: 'orderList',
  fields: {
    isWorking: {
      type: GraphQLBoolean
    },
    updateTime: {
      type: GraphQLFloat
    },
    time: {
      type: GraphQLFloat
    },
    icebergQty: {
      type: GraphQLString
    },
    stopPrice: {
      type: GraphQLString
    },
    side: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    timeInForce: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    cummulativeQuoteQty: {
      type: GraphQLString
    },
    executedQty: {
      type: GraphQLString
    },
    origQty: {
      type: GraphQLString
    },
    price: {
      type: GraphQLString
    },
    clientOrderId: {
      type: GraphQLString
    },
    orderId: {
      type: GraphQLFloat
    },
    symbol: {
      type: GraphQLString
    },
  }
})

export default new GraphQLInputObjectType({
  name: 'OrderInput',
  fields: {
    userId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    list: {
      type: new GraphQLList(list)
    }
  }
});
