const bookshelf = require('../bookshelf.js');
const Manual = require('./manualModel');
const Step = require('./stepModel');


module.exports = bookshelf.Model.extend({
    tableName: 'lessons',
    manual: function(){
        return this.belongsTo(Manual, 'manual_id');
    },
    step: function() {
        return this.hasMany(Step, 'lesson_id')
    }
});