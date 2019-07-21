import {
  GraphQLList,
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

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
      const createTokenHash = `${userdata.password}${userdata.email}`
      userdata.token = utils.generateHash(createTokenHash); /** @todo need to generate the token here dynamically  */
      await UserModel.update(params, { $push: { loginToken: userdata.token } } )
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