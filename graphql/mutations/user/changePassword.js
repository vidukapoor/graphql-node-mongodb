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
    if(!userKeys){
      _params = { password: _new_password }
    }else {
      const { userKeys: _userKeys } = await UserModel.findOne({ email, password: _password }).exec() || {};
      _params = { userKeys }
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
//   changePassword(data: $data)
// }

// {
//   "data": {
//     "email": "user1@mail.com",
//     "password": "user1",
//     "new_password": "user1"
//   }
// }