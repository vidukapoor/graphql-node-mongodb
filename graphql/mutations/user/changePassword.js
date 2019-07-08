import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import userInputType from '../../types/user/user-input';
import UserModel from '../../../models/user.modal';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  async resolve(root, params, options) {
    // need to add encryption
    const { data: { email, password, new_password } }= params; // match password b4 updating
    const updateUser = await UserModel.findOneAndUpdate({ email, password }, { $set: {password: new_password}});
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