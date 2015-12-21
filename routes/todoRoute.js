const Todo = require('../models/todoModel');

module.exports = {
  getTodos(req, res) {
    Todo.collection().fetch().then((todos)=> {
      res.json({
        status: 'ok',
        data: todos.toJSON()
      });
    });
  },

  createTodo(req, res) {
    const text = req.body.text;
    if (text) {
      Todo.forge({
        text
      }).save().then((model)=> {
        res.json({
          status: 'ok',
          data: model.toJSON()
        });
      });
    } else {
      res.json({
        status: `"text" field is required`,
        data: null
      });
    }
  },

  getTodo(req, res) {
    const id = req.params.id;
    Todo.forge({
      id
    }).fetch().then((model)=> {
      res.json({
        status: 'ok',
        data: model.toJSON()
      });
    }).catch((err)=> {
        res.status(404).json({
          status: 'error',
          error: err,
          data: null
        });
      }
    );
  },

  deleteTodo(req, res) {
    const id = req.params.id;
    Todo.forge({
      id
    }).destroy({require: true}).then((model)=> {
      res.json({
        status: 'ok',
        data: model.toJSON()
      });
    }).catch((err)=> {
        res.status(404).json({
          status: 'error',
          error: err,
          data: null
        });
      }
    );
  }
};