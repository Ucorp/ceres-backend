const { pick, omit } = require("ramda");
const { format } = require("date-fns");
const { Model } = require("objection");

const CustomValidator = require("./database/custom-validator");

class BaseModel extends Model {
  static createValidator() {
    return new CustomValidator(this);
  }

  static get jsonSchema() {
    return {};
  }

  static get hiddenFields() {
    return [];
  }

  $beforeInsert() {
    this.created_at = format(new Date(), "YYYY-MM-DD HH:mm:ss");
    this.updated_at = format(new Date(), "YYYY-MM-DD HH:mm:ss");
  }

  $beforeUpdate() {
    this.updated_at = format(new Date(), "YYYY-MM-DD HH:mm:ss");
  }

  $parseJson(json, opts) {
    const {
      constructor: { jsonSchema }
    } = Object.getPrototypeOf(this);

    return pick(Object.keys(jsonSchema), super.$parseJson(json, opts));
  }

  $formatJson(json) {
    const {
      constructor: { hiddenFields }
    } = Object.getPrototypeOf(this);

    return omit(hiddenFields, json);
  }
}

module.exports = BaseModel;
