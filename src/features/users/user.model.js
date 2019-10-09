const BaseModel = require("../../core/base-model");

class User extends BaseModel {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      email: {
        presence: {
          message: "Email не должен быть пустым"
        },
        email: {
          message: "Введите корректный email"
        }
      },
      password: {
        presence: {
          message: "Пароль не должен быть пустым"
        },
        length: {
          minimum: 6,
          message: "Пароль не должен быть короче 6 символов"
        }
      }
    };
  }

  static get hiddenFields() {
    return ["password"];
  }
}

module.exports = User;
