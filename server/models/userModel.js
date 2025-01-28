const Joi = require("joi");

const schema = Joi.object({
  Username: Joi.string().required().min(2),
  Password: Joi.string().required(),
  Role: Joi.string().required(),
});

const validate = (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  next();
};

module.exports = validate;
