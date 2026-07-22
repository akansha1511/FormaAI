import React from "react";
import { useFormContext } from "react-hook-form";

const CheckboxField = ({ field }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="checkbox-group">

            <label>

                <input
                    type="checkbox"
                    {...register(field.id, field.validation || {})}
                />

                {field.label}

            </label>

            {errors[field.id] && (
                <p className="form-error">
                    {errors[field.id].message}
                </p>
            )}

        </div>
    );
};

export default CheckboxField;