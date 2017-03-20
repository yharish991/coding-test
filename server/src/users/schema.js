const Joi = require('joi');

const schema = Joi.object().keys({
  firstName: Joi.string().max(40).required(),
  lastName: Joi.string().max(30).required(),
  address: Joi.string().max(150).required(),
  company: Joi.string().max(50).required(),
});

module.exports = schema;
