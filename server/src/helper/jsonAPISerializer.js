const _ = require('lodash');
const Serializer = require('jsonapi-serializer').Serializer;

function userProfileSerializer(data, version) {
  return _.merge(new Serializer('users', {
    attributes: ['userProfile'],
    keyForAttribute: 'camelCase',
  }).serialize(data), { jsonapi: { version } });
}

function errorSerializer(error, version) {
  const errors = [];
  errors.push({
    status: error.statusCode,
    detail: error.message,
    title: error.title,
  });
  return {
    errors,
    jsonapi: { version },
  };
}

module.exports = {
  errorSerializer,
  userProfileSerializer,
};
