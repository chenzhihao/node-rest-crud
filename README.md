# node-rest-crud

The "node-rest-crud" is a seed repo for quickly building up a node backend which provide RESTFul service.

The RESTFul api is protected by JWT(JSON Web Tokens).

It's build on **Express4** + **Bookshelf** + **Postgres** + **JWT**.

##Usages

* Create database and init its table:

	``` bash
	$ createdb mydb
	$ createuser dbuser
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
    ``` 
   
   As the RESTFul apis are protected and need authentication. We need to get token first:
   
   ``` bash
   $ curl -X POST -H "Content-Type: application/json"  -d '{"userName": "zhihao", "password": "12345"}' 'http://localhost:8888/token'
   ```
  The user and password is hard coded here. In real world we need to implement user validation in *token/index.js* by your self:
  
  ``` javascript
  // mocked validation
	function validateUser(userName, password) {
	  return new Promise((resolve, reject)=> {
	    if (userName === 'zhihao' && password === '12345') {
	      resolve({id: USER_ID});
	    } else {
	      reject({error: 'Auth failed'});
	    }
	  });
	}
  
  ```
  
  If the validation success, we will get the the JWT token:
  
  ``` javascript
  {
	  	"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEsImV4cCI6MTQ1MTM3MDcwNDY5MywiaWF0IjoxNDUwNzY1OTA0fQ.onVTMQnNxJgJKblIO6uIY444ZwkCF7gdz6HKW6syO5g",
  		"expires": 1451370704693,
 		"userId": 1
}
  
  ```
  
  With the token now we can access rest resources:

    ``` bash
    // test to fetch all todos:
    $ curl -X GET -H "x-access-token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEsImV4cCI6MTQ1MTM3MDcwNDY5MywiaWF0IjoxNDUwNzY1OTA0fQ.onVTMQnNxJgJKblIO6uIY444ZwkCF7gdz6HKW6syO5g" 'http://localhost:8888/rest/todos'
	```
	
	Without token error:
	
	``` bash
	// without token
	$ curl -X GET 'http://localhost:8888/rest/todos'
	// get：{"status":"error","error":"No token"}
	
	// invalid token
	$ curl -X GET -H "x-access-token: INVALID_TOKEN" 'http://localhost:8888/rest/todos'
	// get: {"status":"error","error":"token invalid"}
	```