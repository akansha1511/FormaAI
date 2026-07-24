export const getDefaultValues = (fields = []) =>
  fields.reduce((values, field) => {
    values[field.name] =
      field.defaultValue ??
      (field.type === "checkbox" ? false : "");

    return values;
  }, {});

export const groupFieldsByStep = (fields = []) =>
  fields.reduce((steps, field) => {
    const step = field.step ?? 1;

    if (!steps[step]) {
      steps[step] = [];
    }

    steps[step].push(field);

    return steps;
  }, {});

export const getVisibleFields = (fields = [], predicate) =>
  fields.filter(predicate);

export const isEmptyObject = (obj) =>
  obj && Object.keys(obj).length === 0;