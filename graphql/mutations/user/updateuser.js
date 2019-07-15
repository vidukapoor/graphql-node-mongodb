import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import userInputType from '../../types/user/user-input';
import UserModel from '../../../models/user.modal';
import utils from '../../../server/utils';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  // as of now only one of the things will get updated portfolio || userkeys
  async resolve(root, params, options) {
    const { data: { email, password, new_password, userKeys, portfolio } } = params;
    const _password = utils.generateHash(password)
    const _new_password = new_password ? utils.generateHash(new_password) : _password;
    let _params = {};
    const { userKeys: _userKeys, portfolio: _portfolio } = await UserModel.findOne({ email, password: _password }).exec() || {};
    if (userKeys && userKeys.length) {
      const new_data = utils.mergeExchanges(_userKeys, userKeys);
      _params = { userKeys: new_data }
    } else if (portfolio && portfolio.length) {
      _params = { portfolio: utils.mergePortfolio(_portfolio, portfolio) }
    } else {
      _params = { password: _new_password }
    }
    const updateUser = await UserModel.findOneAndUpdate({ email, password: _password }, { $set: _params });
    if (!updateUser) {
      throw new Error('Please validate email and password');
    }
    return true;
  }
};

/**
 * @description mutation query
 */
// mutation M($data: UserInput!){
//   updateuser(data: $data)
// }

// {
//   "data": {
//     "email": "user1@mail.com",
//     "password": "user1",
//     "new_password": "user1"
//   }
// }