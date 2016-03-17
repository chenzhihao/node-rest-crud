const express = require('express');
const router = express.Router();

const handleFetch = require('../../libs/handleFetch');

//router.get('/', function (req, res) {
//    fetchSite().then(site=> {
//        res.send(site);
//    });
//});
//
//router.get('/m/:id', function (req, res) {
//    fetchManual(req.params.id).then(manuals=> {
//        res.send(manuals);
//    });
//});
//
//router.get('/m/:manualId/l/:lessonId', function (req, res) {
//    fetchLesson(req.params.manualId, req.params.lessonId).then(lesson=> {
//        res.send(lesson);
//    });
//});

router.get('/update', function (req, res) {
    handleFetch.handleSite((manual)=> {
        handleFetch.handleManual(manual.id, (lesson)=> {
            handleFetch.handleLesson(manual.id, lesson.id);
        })
    });
    //res.send('Updating!');
});

module.exports = router;