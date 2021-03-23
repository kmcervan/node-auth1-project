
exports.up = function(knex) {
  return knex.schema
  // .createTable('roles', tbl => {
  //     tbl.increments('roleId')
  //     tbl.string('name', 128).notNullable().unique();
  // })
  .createTable('users', tbl => {
      tbl.increments('userId')
      tbl.string('username', 128).notNullable().unique().index();
      tbl.string('password', 256).notNullable();
      // tbl.integer('roleId').unsigned().references('roleId').onDelete('RESTRICT').onUpdate('CASCADE')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
