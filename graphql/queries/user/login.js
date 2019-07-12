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
import utils from '../../../server/utils';

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
  async resolve(root, params, ctx, options) {
    // console.log('options...', ctx.headers) // hear we will get the auth headers { #tested both @rest and graphql }
    const { password } = params;
    params.password = utils.generateHash(password);
    const userdata = await UserModel.findOne(params);
    if (userdata) {
      userdata.token = utils.generateHash(userdata.password); /** @todo need to generate the token here dynamically  */
      /** @todo save generated toke in db */
      return userdata;
    }
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