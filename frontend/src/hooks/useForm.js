import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validate = null) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setValues(prev => ({ ...prev, [name]: newValue }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        
        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
        }
    }, [validate, values]);

    const handleSubmit = useCallback(async (callback) => {
        setIsSubmitting(true);
        
        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
            
            if (Object.keys(validationErrors).length > 0) {
                setIsSubmitting(false);
                return false;
            }
        }
        
        try {
            await callback(values);
            setIsValid(true);
            return true;
        } catch (error) {
            setIsValid(false);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, [validate, values]);

    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
        setIsValid(true);
    }, [initialValues]);

    const setFieldValue = useCallback((name, value) => {
        setValues(prev => ({ ...prev, [name]: value }));
    }, []);

    const setFieldError = useCallback((name, error) => {
        setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    const getFieldProps = useCallback((name) => ({
        name,
        value: values[name] || '',
        onChange: handleChange,
        onBlur: handleBlur,
        error: touched[name] ? errors[name] : ''
    }), [values, errors, touched, handleChange, handleBlur]);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
        setFieldValue,
        setFieldError,
        getFieldProps
    };
};