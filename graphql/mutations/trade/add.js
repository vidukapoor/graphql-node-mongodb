import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString
} from 'graphql';

import TradeModal from '../../../models/trade.model';
import tradeInputType from '../../types/trade/trade-input';
import User from '../../../server/controllers/user.controller';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(tradeInputType)
    }
  },
  async resolve (root, params, options) {
    // const tradeModel = new TradeModal(params.data);
    // get all the active users from system
    // get users portfolio { asset and currency }
    // trigger the binance class with predefined values
    const currency = 'BNB';
    const asset = 'NULLS';
    const users = await User.getUser({ isActive: true });
    console.log('users......', users);
    const tradeModel = true;
    if (!tradeModel) {
      throw new Error('Error creating new trade');
    }
    return true;
  }
};

const mutation = `mutation M($data: TradeInput!){
  addTrade(data: $data)
}`;

export { mutation };