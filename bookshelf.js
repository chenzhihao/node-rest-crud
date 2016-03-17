const knex = require('knex')({
    client: 'postgres',
    connection: {
        host     : '127.0.0.1',
        user     : 'dbuser',
        password : '12345',
        database : 'mydb',
        charset  : 'utf8'
    },
    //debug: true
});

var Orm = require('bookshelf')(knex);
Orm.plugin('bookshelf-camelcase');

module.exports = Orm;