import React from "react";
import { useFormContext } from "react-hook-form";
import FieldWrapper from "./FieldWrapper";

const RadioField = ({ field }) => {

    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <FieldWrapper
            id={field.id}
            label={field.label}
            required={field.required}
            error={errors[field.id]}
        >

            {field.options?.map((option) => (

                <label
                    key={option.value || option}
                    className="radio-option"
                >

                    <input
                        type="radio"
                        value={option.value || option}
                        {...register(field.id, field.validation || {})}
                    />

                    {option.label || option}

                </label>

            ))}

        </FieldWrapper>
    );
};

export default RadioField;