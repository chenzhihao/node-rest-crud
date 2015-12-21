const bookshelf = require('../bookshelf.js');

module.exports = bookshelf.Model.extend({
    tableName: 'todos'
});
