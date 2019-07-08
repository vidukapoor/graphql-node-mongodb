import {
  GraphQLList,
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';

import userType from '../../types/user/user';
import UserModel from '../../../models/user.modal';

export default {
  type: userType,
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params, ctx, options) {
    const { password } = params;
    // generate the hash password for validation
    return UserModel
      .findOne(params)
      .exec();
  }
};

/********************************* examples ****************************** */
// {
//   login(email:"user2@mail.com"){
//     name
//     email
//     _id
//   }
// }

// query loginQuery($email: String!, $password: String!){
//   login(email: $email, password: $password){
//     name
//   }
// }

// {
//   "email":"user1@mail.com",
//   "password":"userpassword"
// }