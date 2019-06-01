import Joi from 'joi';

const validateSignup = (user) => {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).options({
      language: {
        any: {
          allowOnly: 'Passwords do NOT match',
        },
      },
    }),
  };

  return Joi.validate(user, schema);
};

const validateSignin = (user) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
  };
  return Joi.validate(user, schema);
};

const validations = {
  validateSignup,
  validateSignin,
};

export default validations;
