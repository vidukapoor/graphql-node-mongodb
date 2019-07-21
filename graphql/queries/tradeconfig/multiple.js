import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import TradeConfigOutput from '../../types/trade/tradeconfig';
import TradeConfig from '../../../server/controllers/tradeconfig.controller';
import User from '../../../server/controllers/user.controller';

export default {
  type: new GraphQLList(TradeConfigOutput),
  args: {},
  async resolve(root, params, ctx, options) {
    // expect filters based on SIDE { BUY || SELL}
    const loginUser = await User.getUserByToken(ctx.headers);
    if (loginUser && loginUser.userType === 'super_admin') {
      return TradeConfig.activeConfig();
    }
    throw new Error('un-authorized')
  }
};
