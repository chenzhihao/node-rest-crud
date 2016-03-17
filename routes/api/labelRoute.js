const Label = require('../../models/labelModel');

module.exports = {
    getLabels(req, res) {
        const formId = req.params.formId;

        Label.forge({
            formId: formId
        }).fetchAll().then((models)=> {
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
                formId: formId,
                title: req.body.title,
                stepId: req.body.stepId,
                lessonId: req.body.lessonId,
                manualId: req.body.manualId
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

    updateLabels(req, res) {
        const formId = req.params.formId;
        const labelId = req.params.labelId;

        if (formId) {
            Label.forge({
                formId: formId,
                id: labelId,
                title: req.body.title,
                stepId: req.body.stepId,
                lessonId: req.body.lessonId,
                manualId: req.body.manualId
            }).save().then((label)=> {
                res.json({
                    status: 'ok',
                    data: label.toJSON()
                });
            }).catch(err=>console.log(err));
        } else {
            res.json({
                status: `"formId" and "labelId" are required`,
                data: null
            });
        }
    },

    getLabel(req, res) {
        const id = req.params.labelId;
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