'use strict';

const { Strategy: LocalStrategy } = require('passport-local');

const createLocalStrategy = strapi => {

  console.log("local");
  return new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      console.log("lkadsf")
      return strapi.admin.services.auth
        .checkCredentials({ email, password })
        .then(([error, user, message]) => done(error, user, message))
        .catch(error => done(error));
    }
  );
};

module.exports = createLocalStrategy;
