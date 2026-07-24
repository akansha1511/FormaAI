export const parseSchema = (schema = {}) => {
  return {
    id: schema.id,
    title: schema.title ?? "",
    description: schema.description ?? "",
    steps: schema.steps ?? [],
    fields: schema.fields ?? [],
  };
};

export const getFieldMap = (fields = []) =>
  fields.reduce((map, field) => {
    map[field.name] = field;
    return map;
  }, {});