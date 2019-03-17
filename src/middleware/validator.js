const Joi = require('joi');
const Subscription = require('../models/subscription');
const Plan = require('../models/plan');
const ValidationError = require('../errors/validation-error');

const validators = {
  'Subscription': {
    scopes: {
      default: Subscription.SubscriptionValidationSchema
    }
  },
  'Plan': {
    scopes: {
      default: Plan.PlanValidationSchema
    }
  }
}

const scopeExists = (validator, scope) => {
  return Object.keys(validator.scopes).find(key => key === scope) != undefined;
}

const getSchema = (model, scope) => {
  const validator = validators[model];
  if (!validator) {
    throw new Error('Validator does not exists');
  }

  if (validator.scopes) {
    if (scope) {
      if (!scopeExists(validator, scope)) {
        throw new Error(`Scope ${scope} does not exist in ${model} validator`);
      } else {
        return validator.scopes[scope];
      }
    } else {
      return validator.scopes.default;
    }
  } else {
    return validator;
  }
}

const validate = (model, object, scope) => {
  return Joi.validate(object, getSchema(model, scope), {
    allowUnknown: true
  });
}

module.exports = function ValidationMiddleware(model, scope) {
  return (req, res, next) => {
    const validationResult = validate(model, req.body, scope);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message, model);
    } else {
      next();
    }
  };
}