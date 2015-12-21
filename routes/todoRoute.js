const Todo = require('../models/todoModel');

module.exports = {
    get(req, res) {
        Todo.collection().fetch().then((todos)=>{
            res.json(todos);
        });
    },

    post(req,res) {
      new Todo({text:'text'}).save().then((model)=> {
          res.json({ok: true});
      });
    }
};