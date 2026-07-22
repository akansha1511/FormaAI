import React from "react";

const FieldWrapper = ({
  id,
  label,
  required = false,
  error,
  children,
  description,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      {description && (
        <p className="form-description">
          {description}
        </p>
      )}

      {children}

      {error && (
        <p className="form-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FieldWrapper;