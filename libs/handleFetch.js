const Manual = require('../models/manualModel');
const Lesson = require('../models/lessonModel');
var handleFetch = {};
const request = require('request');
const screenStepsConfig = require('../config.js').screenSteps;
const parser = require('xml2json');
const _ = require('lodash');

handleFetch.handleSite = function (cb) {
    fetchSite().then(res=> {
        res.space.assets.asset.forEach((manual)=> {
            Manual.forge({id: manual.id}).fetch().then(collection=> {
                if (!collection) {
                    Manual.forge(manual).save(null, {method: 'insert'}).then(model=> cb(model));
                } else {
                    Manual.forge(manual).save().then(model=> cb(model));
                }
            })
        });
    }).catch(err=> {
        console.log(err);
    });
};

handleFetch.handleManual = function (manualId, cb) {
    if (!manualId) {
        return;
    }
    fetchManual(manualId).then(res=> {
        var lessons = [];
        _.each(res.manual.chapters.chapter, (chapter)=> {
            lessons = lessons.concat(chapter.lessons.lesson);
        });

        lessons.forEach(lesson=> {
            Lesson.forge({id: lesson.id}).fetch().then(collection=> {
                var lessonAttrs = {
                    manualId,
                    id: lesson.id,
                    title: lesson.title,
                    url: lesson.url
                };
                if (!collection) {
                    Lesson.forge(lessonAttrs).save(null, {method: 'insert'});
                    //Lesson.forge(lessonAttrs).save(null, {method: 'insert'}).then(model=> cb(model));

                } else {
                    Lesson.forge(lessonAttrs).save();
                    //Lesson.forge(lessonAttrs).save().then(model=> cb(model));

                }
            });
        })
    })
};

handleFetch.handleLessons = function (manualId, lessonId, cb) {
    if (!lessonId || !manualId) {
        return;
    }
    fetchLesson(manualId, lessonId).then(res=> {
       console.log(res);
    //
    //    lessons.forEach(lesson=> {
    //        Lesson.forge({id: lesson.id}).fetchAll().then(collection=> {
    //            if (collection.toJSON().length === 0) {
    //                Lesson.forge({
    //                    id: lessonId,
    //                    title: lesson.title,
    //                    url: lesson.url
    //                }).save(null, {method: 'insert'}).then(model=> cb(model));
    //            } else {
    //                Lesson.forge({
    //                    id: lessonId,
    //                    title: lesson.title,
    //                    url: lesson.url
    //                }).save().then(model=> cb(model));
    //            }
        //        });
    //    })
    })
};

function fetchSite(siteId) {
    siteId = siteId || screenStepsConfig.siteId;
    return new Promise((resolve, reject)=> {
        request({
            url: `${screenStepsConfig.url}/s/${siteId}`,
            headers: {
                'Authorization': screenStepsConfig.authorization,
                'Content-Type': 'application/xml',
                'Accept': 'application/xml'
            }
        }, (error, response, body)=> {
            if (error) {
                reject(error);
            }
            if (!response) {
                reject({err: `cann't connect`});
            }
            var resJSON = JSON.parse(parser.toJson(body));
            resolve(resJSON);
        });
    });
}

function fetchManual(manualId) {
    return new Promise((resolve, reject)=> {
        request({
            url: `${screenStepsConfig.url}/s/${screenStepsConfig.siteId}/m/${manualId}`,
            headers: {
                'Authorization': screenStepsConfig.authorization,
                'Content-Type': 'application/xml',
                'Accept': 'application/xml'
            }
        }, (error, response, body)=> {
            if (error) {
                reject(error);
            }
            var resJSON = JSON.parse(parser.toJson(body));
            resolve(resJSON);
        });
    });
}

function fetchLesson(manualId, lessonId) {
    return new Promise((resolve, reject)=> {
        request({
            url: `${screenStepsConfig.url}/s/${screenStepsConfig.siteId}/m/${manualId}/l/${lessonId}`,
            headers: {
                'Authorization': screenStepsConfig.authorization,
                'Content-Type': 'application/xml',
                'Accept': 'application/xml'
            }
        }, (error, response, body)=> {
            if (error) {
                reject(error);
            }
            var resJSON = JSON.parse(parser.toJson(body));
            resolve(resJSON);
        });
    });
}

module.exports = handleFetch;

