import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';
import utils from '../../../server/utils';

import userInputType from '../../types/user/user-input';
import UserModel from '../../../models/user.modal';

export default {
  type: GraphQLString, // replace this one with response handler
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  async resolve(root, params, options) {
    const { data: { email } } = params;
    const userModel = new UserModel(params.data);
    try {
      const isExitingUser = await UserModel.findOne({ email }).exec();
      if (!isExitingUser) {
        userModel.password = utils.generateHash(userModel.password);
        userModel.userKeys = userModel.userKeys && userModel.userKeys.length ? utils.mergeExchanges([], userModel.userKeys) : [];
        const response = await userModel.save();
        if (response) {
          return 'success';
        } else {
          return 'Error adding new user';
        }
      } else {
        return 'user already existing';
      }
    } catch (e) {
      return 'Error adding new user!';
    }
  }
};

/**
 * @description mutation
 */

// mutation M($data: UserInput!){
//   singnup(data: $data)
// }

// {
//   "data": {
//     "email": "testing@local.com",
//     "password": "user1",
//     "name": "testinguser"
//   }
// }