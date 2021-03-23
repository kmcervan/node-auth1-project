const db = require('../../data/db-config');

module.exports = {
    get,
    getBy,
    getById,
    add
}

function get(){
    return db('users');
}
function getBy(filter){
    return db('users').where(filter).orderBy('id');
}
async function add(user){
    const [id] = await db('users').insert(user, 'id');
    return getById(id);
}
function getById(id){
    return db('users').where({ id }).first();
}