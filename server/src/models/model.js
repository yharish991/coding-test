const cloudant = require('cloudant');
const _ = require('underscore');

// Database credentials, Object.freeze() is used to prevent the object from being modified
const DATABASE_DEFAULTS = Object.freeze({
  account: process.env.CLOUDANT_USERNAME,
  password: process.env.CLOUDANT_PASSWORD,
});

// create the cloudant connection
const conn = cloudant(DATABASE_DEFAULTS);

const Databases = Object.freeze({
  USERS: 'users',
});


function createOrUpdateDocument(dbname, document, id, rev) {
  const parameters = {
    docName: id,
  };

  if (!_.isEmpty(rev)) {
    parameters.rev = rev;
  }
  return new Promise((resolve, reject) => {
    conn.db.use(dbname).insert(document, parameters, (err, doc) => {
      if (err) {
        return reject({
          message: err.description,
          statusCode: 500,
        });
      }
      const resultDocument = document;
      resultDocument._id = doc.id;
      resultDocument._rev = doc.rev;
      return resolve(resultDocument);
    });
  });
}

module.exports = {
  createOrUpdateDocument,
  Databases,
};

