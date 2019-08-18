exports.up = knex => {
  return knex.schema.createTable("users", table => {
    table.increments("id");
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("first_name", 255);
    table.string("last_name", 255);
    table.timestamps();
  });
};

exports.down = knex => {
  return knex.schema.dropTable("users");
};
