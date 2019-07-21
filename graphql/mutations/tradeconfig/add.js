import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString
} from 'graphql';

import TradeConfig from '../../../server/controllers/tradeconfig.controller';
import User from '../../../server/controllers/user.controller';
import tradeConfigInputType from '../../types/trade/tradeconfig-input';

export default {
  type: GraphQLString,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(tradeConfigInputType)
    }
  },
  async resolve(root, params, options) {
    const loginUser = await User.getUserByToken(options.headers);
    if (loginUser && loginUser.userType === 'super_admin') {
      const _params = new TradeConfig.tradeConfigInstance(params.data);
      const value = {};
      const _configModel = Object.assign(value, _params._doc);
      delete _configModel['_id']   
      const { asset, currency } = _configModel;
      const matchParams = { asset, currency }
      const activetrades = await TradeConfig.upsetConfig(matchParams, _configModel);
      if (!activetrades) {
        throw new Error('Error creating new config');
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