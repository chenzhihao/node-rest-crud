const express = require('express');
const router = express.Router();
const request = require('request');
const screenStepsConfig = require('../../config.js').screenSteps;
const parser = require('xml2json');
const handleManuals = require('../../libs/handleManuals');

router.get('/', function (req, res) {
  fetchSite().then(site=> {
    res.send(site);
  });
});

router.get('/manuals/:id', function (req, res) {
  fetchManual(req.params.id).then(manuals=> {
    res.send(manuals);
  });
});

function fetchSite(siteId) {
  siteId = siteId ||  screenStepsConfig.siteId;
  return new Promise((resolve, reject)=>{
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
      var resJSON = JSON.parse(parser.toJson(body));
      resolve(resJSON);
    });
  });
}

function fetchManual(manualId) {
  return new Promise((resolve, reject)=>{
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


module.exports = router;
