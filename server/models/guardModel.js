const Joi = require("joi");

const schema = Joi.object({
  Name: Joi.string().required().min(2),
  PhoneNumber: Joi.string().required(),
  Address: Joi.string().required(),
  AssignedSiteID: Joi.number().required(),
  Salary: Joi.number().required(),
  Status: Joi.string().required(),
});

const validate = (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  next();
};

module.exports = validate;
