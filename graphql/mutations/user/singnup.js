import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import userInputType from '../../types/user-input';
import UserModel from '../../../models/user.modal';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  async resolve (root, params, options) {
    const userModel = new UserModel(params.data);
    const newUser = await userModel.save();

    if (!newUser) {
      throw new Error('Error adding new user');
    }
    return true;
  }
};

/**
 * @description mutation query
 */
// mutation M{
//   singnup(data: {
//     name:"user"
//     email: "user1@mail.com"
//     password:"userpassword"
//   })
// }