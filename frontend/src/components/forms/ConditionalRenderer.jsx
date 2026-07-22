import React from "react";
import { useFormContext } from "react-hook-form";

import DynamicField from "./DynamicField";

const ConditionalRenderer = ({ field }) => {

  const { watch } = useFormContext();

  if (!field.dependsOn) {
    return <DynamicField field={field} />;
  }

  const dependencyValue = watch(field.dependsOn.field);

  const shouldShow =
    dependencyValue === field.dependsOn.value;

  if (!shouldShow) {
    return null;
  }

  return <DynamicField field={field} />;
};

export default ConditionalRenderer;