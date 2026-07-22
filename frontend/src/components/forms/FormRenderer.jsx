import React from "react";

import ConditionalRenderer from "./ConditionalRenderer";

const FormRenderer = ({ schema }) => {

  if (!schema || !schema.fields) {
    return null;
  }

  return (
    <>
      {schema.fields.map((field) => (
        <ConditionalRenderer
          key={field.id}
          field={field}
        />
      ))}
    </>
  );
};

export default FormRenderer;