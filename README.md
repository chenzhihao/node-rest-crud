# node-rest-crud

The "node-rest-crud" is a seed repo for quickly building up a node backend which provide restful service.

It's build on **Express4** + **Bookshelf** + **Postgres**.

##usage

* Create database and init its table:

	``` sql
	createdb mydb
	psql mydb dbuser -f init_db.sql

	```

* Config bookshelf

	Provide database informations in *bookshelf.js* which is the only db connection pool instance.
	
	``` javascript
	const knex = require('knex')({
        client: 'postgres',
        connection: {
            host     : '127.0.0.1',
            user     : 'dbuser',
            password : '12345',
            database : 'mydb',
            charset  : 'utf8'
        }
    });
	```