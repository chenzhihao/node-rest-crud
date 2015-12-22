const jwt = require('jwt-simple');

module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'] || req.body && req.body.access_token;

  if (token) {
    try {
      const decoded = jwt.decode(token, require('../config').jwtTokenSecret);
      if (decoded.exp <= Date.now()) {
        res.status(401).json({status: 'error', error: 'Access token has expired'});
      } else {
        req.decoded = decoded;
        return next();
      }
    }
    catch (err) {
      res.status(401).json({status: 'error', error: 'token invalid'});
    }
  } else {
    res.status(401).json({status: 'error', error: 'No token'});
  }
};