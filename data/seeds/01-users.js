
exports.seed = function(knex) {
  
  return knex('users')
    .insert([
      {username: 'karla', password: 'qwerty'}
    ])
    
};
