var express = require('express');
var router = express.Router();
var formRoute = require('./formRoute');
var labelRoute = require('./labelRoute');

router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.route('/forms').get(formRoute.getForms).post(formRoute.createForms);
router.route('/forms/:id').get(formRoute.getForm).delete(formRoute.deleteForm);


router.route('/forms/:formId/labels').get(labelRoute.getLabels);
router.route('/forms/:formId/labels/:labelId').get(labelRoute.getLabel);

router.route('/forms/:formId/labels').post(labelRoute.createLabels);
router.route('/forms/:formId/labels/:labelId').put(labelRoute.updateLabels);

module.exports = router;