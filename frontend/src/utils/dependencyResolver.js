export const evaluateCondition = (condition = {}, values = {}) => {
  const currentValue = values[condition.field];

  switch (condition.operator) {
    case "equals":
      return currentValue === condition.value;

    case "notEquals":
      return currentValue !== condition.value;

    case "includes":
      return Array.isArray(currentValue)
        ? currentValue.includes(condition.value)
        : false;

    case "greaterThan":
      return currentValue > condition.value;

    case "lessThan":
      return currentValue < condition.value;

    default:
      return true;
  }
};

export const shouldRenderField = (field, values) => {
  if (!field.condition) return true;

  return evaluateCondition(field.condition, values);
};