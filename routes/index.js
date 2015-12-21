var express = require('express');
var router = express.Router();
var todoRoute = require('./todoRoute');

router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

router.route('/todos').get(todoRoute.getTodos).post(todoRoute.createTodo);

router.route('/todos/:id').get(todoRoute.getTodo).delete(todoRoute.deleteTodo);

module.exports = router;
