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
    /**
     * @todo check the user the there or not then hit the save for new record
     */
    const userModel = new UserModel(params.data);
    try {
      const response = await userModel.save();
      return true;
    } catch (e) {
      throw new Error('Error adding new user');
    }
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