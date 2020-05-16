'use strict';
let moment = require('moment');

module.exports = function(Backofficeuser) {
  Backofficeuser.securelogin = function(credentials, include, req, cb) {
    // eslint-disable-next-line camelcase,max-len
    Backofficeuser.app.models.LoginAttempt.count({email: credentials.email, status: 'FAILED', created_at: {gt: moment().subtract(30, 'm').toDate()}}).then((count) => {
      let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (count < 3) {
        Backofficeuser.login(credentials, include).then((token) => {
          Backofficeuser.app.models.LoginAttempt.create({
            // eslint-disable-next-line camelcase
            created_at: moment(),
            email: credentials.email,
            // eslint-disable-next-line camelcase
            ip_address: ip,
            status: 'SUCCESS',
          }).then((attempt) => {
            cb(null, token);
          }
          ).catch((err) => { cb(err); });
        }).catch((error) => {
          if (error.code === 'LOGIN_FAILED') {
            Backofficeuser.app.models.LoginAttempt.create({
              // eslint-disable-next-line camelcase
              created_at: moment(),
              email: credentials.email,
              // eslint-disable-next-line camelcase
              ip_address: ip,
              status: 'FAILED',
            }).then((attempt) => {

            }
            ).catch((err) => { cb(err); });
          }
          cb(error);
        });
      }      else {
        Backofficeuser.app.models.LoginAttempt.create({
          // eslint-disable-next-line camelcase
          created_at: moment(),
          email: credentials.email,
          // eslint-disable-next-line camelcase
          ip_address: ip,
          status: 'FAILED',
        }).then((attempt) => {

        }
        ).catch((err) => { cb(err); });

        const error = new Error();
        error.statusCode = 401;
        error.code = 'MAX_ATTEMPTS_REACHED';
        cb(error);
      }
    }).catch((error) => {
      cb(error);
    });
  };

  Backofficeuser.remoteMethod(
    'securelogin',
    {
      // eslint-disable-next-line max-len
      description: 'Login a user with username/email and password. Block login after x failures',
      accepts: [
        // eslint-disable-next-line max-len
        {arg: 'credentials', type: 'object', required: true, http: {source: 'body'}},
        {arg: 'include', type: ['string'], http: {source: 'query'},
          description: 'Related objects to include in the response. ' +
            'See the description of return value for more details.'},
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
      ],
      returns: {
        arg: 'accessToken', type: 'object', root: true,
        description: '',
      },
      http: {verb: 'post'},
    }
  );
};
