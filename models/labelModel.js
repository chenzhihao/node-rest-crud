const bookshelf = require('../bookshelf.js');
const Form = require('./formModel');

module.exports = bookshelf.Model.extend({
    tableName: 'labels',
    forms: function () {
        return this.belongsTo(Form, 'form_id');
    }
});