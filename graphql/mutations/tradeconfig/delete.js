import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID
} from 'graphql';

import TradeConfig from '../../../server/controllers/tradeconfig.controller';
import User from '../../../server/controllers/user.controller';
import tradeConfigInputType from '../../types/trade/tradeconfig-input';

export default {
  type: GraphQLString,
  args: {
    trade_id: {
      name: 'trade_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(root, params, options) {
    const loginUser = await User.getUserByToken(options.headers);
    if (loginUser && loginUser.userType === 'super_admin') {
      const activetrades = await TradeConfig.deleteById(params.trade_id);
      if (!activetrades) {
        throw new Error('Error deleting trade');
      }
      return 'success';
    } else {
      return 'Not-authorised'
    }
  }
};

const mutation = `mutation M($data: TradeConfigInput!){
  addTradeConfig(data: $data)
}`;

// {
//   "data": {
//     "user_ids": ["22","2223"],
//     "exposure_time": "aaa",
//     "asset": "bnb",
//     "currency": "eth",
//     "fallback_config_id": "eee2232e33rrr",
//     "isActive": true,
//     "level": 0,
//     "round_config": [
//       {
//         "waiting_time": "333",
//         "time_in_force": "GTC"
//       }
//     ]
//   }
// }

export { mutation };