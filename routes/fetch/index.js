const express = require('express');
const router = express.Router();
const request = require('request');
const screenStepsConfig = require('../../config.js').screenSteps;
const parser = require('xml2json');
const handleManuals = require('../../libs/handleManuals');

router.get('/', function (req, res) {
  request({
    url: `${screenStepsConfig.url}/s/${screenStepsConfig.siteId}`,
    headers: {
      'Authorization': screenStepsConfig.authorization,
      'Content-Type': 'application/xml',
      'Accept': 'application/xml'
    }
  }, (error, response, body)=> {
    if (error) {
      return res.status(200).send(error);
    }
    res.send(parser.toJson(body));
    var resJSON = JSON.parse(parser.toJson(body));
    var manuals =resJSON.space.assets;
    console.log(handleManuals);
    handleManuals(manuals);
  });
});


module.exports = router;
