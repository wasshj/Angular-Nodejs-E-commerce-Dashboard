'use strict';
module.exports = function(app) {
  if (false) {
    app.models.BackofficeUser.create([
      {
        username: 'wassim.hajji.18@gmail.com', email: 'wassim.hajji.18@gmail.com', password: '1234567',
        firstName: 'Wassim', lastName: 'Hajji',
      },
    ], function(err, users) {
      if (err) return console.log(err);
      else
        console.log('done');
    });
  }
};
