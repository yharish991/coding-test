const _ = require('lodash');
const Serializer = require('jsonapi-serializer').Serializer;

function userProfileSerializer(data, version) {
  return _.merge(new Serializer('users', {
    attributes: ['accessToken', 'userProfile'],
    keyForAttribute: 'camelCase',
  }).serialize(data), { jsonapi: { version } });
}

function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function errorSerializer(error, version) {
  let errors = [];
  if (error.error && isJSON(error.error)) {
    const errObj = JSON.parse(error.error);
    if (_.has(errObj, 'errors')) {
      errors = errObj.errors;
    }
  } else {
    errors.push({
      status: error.statusCode,
      detail: error.message,
    });
  }
  return {
    errors,
    jsonapi: { version },
  };
}

module.exports = {
  errorSerializer,
  userProfileSerializer,
};
