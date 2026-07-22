import React from "react";
import { useFormContext } from "react-hook-form";
import FieldWrapper from "../FieldWrapper";

const FileUploadField = ({ field }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <FieldWrapper
            id={field.id}
            label={field.label}
            required={field.required}
            description={field.description}
            error={errors[field.id]}
        >
            <input
                id={field.id}
                type="file"
                accept={field.accept || "*"}
                multiple={field.multiple || false}
                {...register(field.id, field.validation || {})}
            />
        </FieldWrapper>
    );
};

export default FileUploadField;