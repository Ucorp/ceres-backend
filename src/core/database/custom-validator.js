const validate = require("validate.js");
const { Validator, ValidationError } = require("objection");

class CustomValidator extends Validator {
  constructor(model) {
    super();

    this.model = model;
  }

  validate(args) {
    const { model } = this;
    const schema = model.jsonSchema || {};
    const { json } = args;

    const error = validate(json, schema, {
      fullMessages: false
    });

    if (error) {
      const validationError = new ValidationError({
        type: "ModelValidation",
        data: error,
        message: "Validation error"
      });
      throw validationError;
    }

    return json;
  }

  beforeValidate(args) {
    return super.beforeValidate(args);
  }

  afterValidate(args) {
    return super.afterValidate(args);
  }
}

module.exports = CustomValidator;
