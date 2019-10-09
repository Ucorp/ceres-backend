const bcrypt = require("bcryptjs");

class UserService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const user = await this.findByEmail(data);
      if (!user.length) {
        const userData = Object.assign({}, data);
        userData.password = await bcrypt.hash(userData.password, 10);

        const newUser = await this.model.query().insertAndFetch(userData);
        return newUser;
      }
      throw new Error(`User with email: ${data.email} exist`);
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    try {
      const users = await this.model.query();
      return users;
    } catch (e) {
      throw e;
    }
  }

  async findByEmail({ email }) {
    try {
      const user = await this.model.query().where("email", "=", email);
      return user;
    } catch (e) {
      throw e;
    }
  }

  async findById(id) {
    try {
      const user = await this.model.query().findById(id);
      return user;
    } catch (e) {
      throw e;
    }
  }

  async update(id, data) {
    try {
      const user = await this.model.query().patchAndFetchById(id, data);
      return user;
    } catch (e) {
      throw e;
    }
  }

  async delete(id) {
    try {
      await this.model.query().deleteById(id);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UserService;
