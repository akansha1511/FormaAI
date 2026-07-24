export const buildValidationRules = (field) => {
  const rules = {};

  if (field.required) {
    rules.required = field.validation?.requiredMessage || "Required";
  }

  if (field.minLength) {
    rules.minLength = {
      value: field.minLength,
      message: `Minimum ${field.minLength} characters`,
    };
  }

  if (field.maxLength) {
    rules.maxLength = {
      value: field.maxLength,
      message: `Maximum ${field.maxLength} characters`,
    };
  }

  if (field.pattern) {
    rules.pattern = {
      value: new RegExp(field.pattern),
      message: field.validation?.patternMessage || "Invalid format",
    };
  }

  if (field.min !== undefined) {
    rules.min = {
      value: field.min,
      message: `Minimum value ${field.min}`,
    };
  }

  if (field.max !== undefined) {
    rules.max = {
      value: field.max,
      message: `Maximum value ${field.max}`,
    };
  }

  return rules;
};