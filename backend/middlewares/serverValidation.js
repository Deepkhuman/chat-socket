const joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = joi.object({
    firstname: joi.string().min(3).max(10).required(),
    lastname: joi.string().min(3).max(10).required(),
    company: joi.string().min(3).max(10).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
