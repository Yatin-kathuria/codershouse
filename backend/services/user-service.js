const UserModal = require("../models/user-model");

class UserService {
  async findUser(filter) {
    const user = await UserModal.findOne(filter);
    return user;
  }

  async createUser(data) {
    const user = await UserModal.create(data);
    return user;
  }
}

module.exports = new UserService();
