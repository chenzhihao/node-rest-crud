var express = require('express');
var router = express.Router();
var todoRoute = require('./todoRoute');

router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

router.route('/todos').get(todoRoute.get).post(todoRoute.post);

module.exports = router;
