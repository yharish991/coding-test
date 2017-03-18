const _ = require('lodash');
const Model = require('../models/model');
const Promise = require('bluebird');

function createUser(body) {
  return Model.createOrUpdateDocument(Model.Databases.USERS, body)
    .then((doc) => (Promise.resolve({ id: doc._id, userProfile: _.omit(doc, ['_id', '_rev']) })));
}

module.exports = {
  createUser,
};
