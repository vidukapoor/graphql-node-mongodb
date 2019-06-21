import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';

import userType from '../../types/user';
import UserModel from '../../../models/user.modal';

export default {
  type: new GraphQLList(userType),
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    }
  },
  resolve(root, params, ctx, options) {
    return UserModel
      .find(params)
      .exec();
  }
};

// {
//   login(email:"user2@mail.com"){
//     name
//     email
//     _id
//   }
// }