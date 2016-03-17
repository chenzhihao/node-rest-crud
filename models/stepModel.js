const bookshelf = require('../bookshelf.js');
const Lesson = require('./lessonModel');

module.exports = bookshelf.Model.extend({
    tableName: 'lessons',
    lesson: function(){
        return this.belongsTo(Lesson, 'lesson_id');
    }
});