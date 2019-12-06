const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAnswerInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.answer = !isEmpty(data.answer) ? data.answer : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email does not exist";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.answer)) {
    errors.answer = "Answer field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
