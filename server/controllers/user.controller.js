// user related queries
import UserModel from '../../models/user.modal';

class UserModelWrapper {
  async activeUsers() {
    const users = await UserModel.find({ isActive: true }).exec();
    return users;
  }

  async getUser(query){
    const users = await UserModel.find(query).exec();
    return users;
  }
  
  async getProjectedUser(query){
    const users = await UserModel.aggregate(query).exec();
    return users;
  }
}


const User = new UserModelWrapper();
export default User;