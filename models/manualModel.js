const bookshelf = require('../bookshelf');
const Lesson = require('./lessonModel');

module.exports = bookshelf.Model.extend({
    tableName: 'manuals',
    lesson: function(){
        return this.hasMany(Lesson, 'manual_id');
    }
});