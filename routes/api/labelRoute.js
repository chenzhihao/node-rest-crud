const Label = require('../../models/labelModel');

module.exports = {
    getLabels(req, res) {
        const labelId = req.params.labelId;
        const formId = req.params.formId;

        Label.collection().fetch().then((models)=> {
            res.json({
                status: 'ok',
                data: models.toJSON()
            });
        });
    },

    createLabels(req, res) {
        const formId = req.params.formId;

        if (formId) {
            Label.forge({
                form_id: formId
            }).save().then((label)=> {
                res.json({
                    status: 'ok',
                    data: label.toJSON()
                });
            }).catch(err=>console.log(err));
        } else {
            res.json({
                status: `"formId" field is required`,
                data: null
            });
        }
    },

    getTodo(req, res) {
        const id = req.params.id;
        Label.forge({
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
        Label.forge({
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