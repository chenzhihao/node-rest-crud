const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const moment = require('moment');

// it's a mocked userID, in real world we should get this from database
const USER_ID = 1;

// mocked validation
function validateUser(userName, password) {
  return new Promise((resolve, reject)=> {
    if (userName === 'zhihao' && password === '12345') {
      resolve({id: USER_ID});
    } else {
      reject({error: 'Auth failed'});
    }
  });
}

router.post('/', function (req, res) {
  const userName = req.body.userName;
  const password = req.body.password;

  validateUser(userName, password).then(
    (validateResult)=> {
      const expires = moment().add(7, 'days').valueOf();
      const token = jwt.encode({
          iss: validateResult.id,
          // when the token will expire
          exp: expires,
          // when the token was issued
          iat: moment().unix()
        },
        require('../../config').jwtTokenSecret
      );

      res.json({
        token: token,
        expires: expires,
        userId: validateResult.id
      });
    }
  ).catch((err)=> {
    res.status(401).json(err);
  });
});

module.exports = router;