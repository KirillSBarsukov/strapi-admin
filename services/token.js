'use strict';

const crypto = require('crypto');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const axios = require("axios");

const defaultJwtOptions = { expiresIn: '30d' };

const getTokenOptions = () => {
  const { options, secret } = strapi.config.get('server.admin.auth', {});

  return {
    secret,
    options: _.merge(defaultJwtOptions, options),
  };
};

/**
 * Create a random token
 * @returns {string}
 */
const createToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

/**
 * Creates a JWT token for an administration user
 * @param {object} user - admin user
 */
const createJwtToken = user => {
  const { options, secret } = getTokenOptions();

  return jwt.sign({ id: user.id }, secret, options);
};

/**
 * Tries to decode a token an return its payload and if it is valid
 * @param {string} token - a token to decode
 * @return {Object} decodeInfo - the decoded info
 */
const decodeJwtToken = async token => {
  const {secret} = getTokenOptions();

  try {
    const payload = jwt.verify(token, secret);
    return {payload, isValid: true};
  } catch (err) {
    // const {data} = await axios({
    //   method: 'post',
    //   url: 'http://localhost/preview/validatejwt.ajx',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // console.log("avetti token", data)
    // if(data.validity){
    //   console.log("token is valid", data.validity)
    //   return { payload: {id: "606db938e68de2686c667eea", iat: 1618327950, exp: 1620919950 }, isValid: data.validity };
    // }

    return {payload: null, isValid: false};
  }
};

module.exports = {
  createToken,
  createJwtToken,
  getTokenOptions,
  decodeJwtToken,
};
