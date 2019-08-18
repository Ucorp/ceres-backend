const bcrypt = require("bcryptjs");

exports.seed = knex => {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        {
          email: "test@test.test",
          password: bcrypt.hashSync("1234556789", 10),
          first_name: "testname",
          last_name: "lastname"
        }
      ]);
    });
};
