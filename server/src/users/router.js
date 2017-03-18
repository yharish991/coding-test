const express = require('express');
const Joi = require('joi');
const router = new express.Router({ mergeParams: true });

const errorSerializer = require('../helper/jsonAPISerializer').errorSerializer;
const service = require('./usersSrvc');
const schema = require('./schema');
const userProfileSerializer = require('../helper/jsonAPISerializer').userProfileSerializer;

const JOI_OPTIONS = {
  abortEarly: false,
  convert: false,
};

function createUser(req, res) {
  const { error } = Joi.validate(req.body, schema, JOI_OPTIONS);
  if (error) {
    return res.status(400).send(errorSerializer({
      message: error.details,
      title: error.name,
      statusCode: 400,
    }, '1.0.0'));
  }
  service.createUser(req.body)
  .then(resp => res.status(201).send(userProfileSerializer(resp, '1.0.0')))
  .catch(err => res.status(500).send(errorSerializer(err, '1.0.0')));
}

router.post('/', createUser);

module.exports = router;
