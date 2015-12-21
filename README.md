# node-rest-crud

The "node-rest-crud" is a seed repo for quickly building up a node backend which provide restful service.

It's build on **Express4** + **Bookshelf** + **Postgres**.

##Usages

* Create database and init its table:

	``` bash
	$ createdb mydb
	$ psql mydb dbuser -f init_db.sql

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
* Launch app

    ``` bash
    $ npm i
    $ npm run start

    // test to fetch all todos:
    $ curl -X GET -H "Cache-Control: no-cache" 'http://localhost:8888/rest/todos'

	// test to create one todo:
	$ curl -X POST -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'text=new+todo' 'http://localhost:8888/rest/todos'
    ```