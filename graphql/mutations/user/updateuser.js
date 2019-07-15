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
  async resolve(root, params, options) {
    const { data: { email, password, new_password, userKeys } } = params;
    const _password = utils.generateHash(password)
    const _new_password = new_password ? utils.generateHash(new_password) : _password;
    let _params = {};
    if (userKeys && userKeys.length) {
      const { userKeys: _userKeys } = await UserModel.findOne({ email, password: _password }).exec() || {};
      const new_data = utils.mergeExchanges(_userKeys, userKeys);
      _params = { userKeys: new_data }
    } else if (symbols && symbols.length) {
      _params = { password: _new_password }
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