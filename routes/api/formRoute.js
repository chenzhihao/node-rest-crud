const Form = require('../../models/formModel');

module.exports = {
    getForms(req, res) {
        const title = req.query.title;
        if (title) {
            return Form.forge(title).fetch({withRelated: ['labels']}).then((forms)=> {
                res.json({
                    status: 'ok',
                    data: forms.toJSON()
                });
            }).catch((err)=> {
                res.json({
                        stats: 'error',
                        err,
                        data: null
                    }
                )
            })
        }

        Form.collection().fetch({withRelated: ['labels']}).then((forms)=> {
            res.json({
                status: 'ok',
                data: forms.toJSON()
            });
        });
    },

    createForms(req, res) {
        const title = req.body.title;
        if (title) {
            Form.forge({
                title
            }).save().then((model)=> {
                res.json({
                    status: 'ok',
                    data: model.toJSON()
                });
            });
        } else {
            res.json({
                status: `"title" field is required`,
                data: null
            });
        }
    },

    getForm(req, res) {
        const id = req.params.id;
        Form.forge({
            id
        }).fetch({withRelated: ['labels']}).then((model)=> {
            res.json({
                status: 'ok',
                data: model.toJSON()
            });
        }).catch((err)=> {
            console.log(err);

            res.status(404).json({
                    status: 'error',
                    error: err,
                    data: null
                });
            }
        );
    },

    deleteForm(req, res) {
        const id = req.params.id;
        Form.forge({
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