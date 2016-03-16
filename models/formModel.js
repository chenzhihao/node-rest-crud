const bookshelf = require('../bookshelf.js');
const Label = require('./labelModel');

module.exports = bookshelf.Model.extend({
    tableName: 'forms',
    labels: function(){
        return this.hasMany(Label, 'form_id');
    }
});