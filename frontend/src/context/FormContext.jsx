import React, { createContext, useState, useContext } from 'react';

// Create the context
const FormContext = createContext();

// Custom hook to use the form context
export const useForm = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useForm must be used within FormProvider');
    }
    return context;
};

// Form Provider component
export const FormProvider = ({ children }) => {
    // Form state
    const [formData, setFormData] = useState({});
    const [formConfig, setFormConfig] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [extractedData, setExtractedData] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [draftSaved, setDraftSaved] = useState(false);

    // Update form data
    const updateFormData = (data) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    // Set form field with validation
    const setField = (fieldName, value) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
        // Clear error for this field if it exists
        if (errors[fieldName]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    // Add error for a field
    const setFieldError = (fieldName, errorMessage) => {
        setErrors(prev => ({ ...prev, [fieldName]: errorMessage }));
    };

    // Clear all errors
    const clearErrors = () => {
        setErrors({});
    };

    // Reset form completely
    const resetForm = () => {
        setFormData({});
        setFormConfig(null);
        setCurrentStep(0);
        setExtractedData(null);
        setErrors({});
        setIsSubmitted(false);
        setDraftSaved(false);
    };

    // Save draft
    const saveDraft = () => {
        setDraftSaved(true);
        // In a real app, you'd save to localStorage or API
        localStorage.setItem('formDraft', JSON.stringify(formData));
        setTimeout(() => setDraftSaved(false), 2000);
        return true;
    };

    // Load draft
    const loadDraft = () => {
        const saved = localStorage.getItem('formDraft');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setFormData(parsed);
                return true;
            } catch (e) {
                return false;
            }
        }
        return false;
    };

    // Submit form
    const submitForm = async () => {
        setIsLoading(true);
        try {
            // Simulate API submission - Replace with actual API
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsSubmitted(true);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    // Navigation functions
    const goToStep = (step) => {
        if (step >= 0 && step < (formConfig?.sections?.length || 1)) {
            setCurrentStep(step);
        }
    };

    const nextStep = () => {
        if (currentStep < (formConfig?.sections?.length || 1) - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Generate form config from extracted data
    const generateFormConfig = (extractedData) => {
        // This would be dynamically generated based on the extracted data
        // For demo, we'll create a sample config
        const config = {
            sections: [
                {
                    id: 'personal',
                    title: 'Personal Information',
                    fields: [
                        { id: 'fullName', type: 'text', label: 'Full Name', required: true },
                        { id: 'email', type: 'email', label: 'Email Address', required: true },
                        { id: 'phone', type: 'tel', label: 'Phone Number' },
                    ]
                },
                {
                    id: 'incident',
                    title: 'Incident Details',
                    fields: [
                        { id: 'type', type: 'select', label: 'Incident Type', options: ['Accident', 'Theft', 'Damage', 'Other'], required: true },
                        { id: 'date', type: 'date', label: 'Date of Incident', required: true },
                        { id: 'description', type: 'textarea', label: 'Description', required: true },
                    ]
                },
                {
                    id: 'additional',
                    title: 'Additional Information',
                    fields: [
                        { id: 'witnesses', type: 'text', label: 'Witnesses' },
                        { id: 'policeReport', type: 'checkbox', label: 'Police Report Filed' },
                        { id: 'severity', type: 'radio', label: 'Severity', options: ['Low', 'Medium', 'High', 'Critical'] },
                    ]
                }
            ]
        };
        setFormConfig(config);
        return config;
    };

    // Value object to provide to consumers
    const value = {
        formData,
        setFormData,
        formConfig,
        setFormConfig,
        currentStep,
        setCurrentStep,
        isLoading,
        setIsLoading,
        extractedData,
        setExtractedData,
        errors,
        setErrors,
        isSubmitted,
        setIsSubmitted,
        draftSaved,
        setDraftSaved,
        updateFormData,
        setField,
        setFieldError,
        clearErrors,
        resetForm,
        saveDraft,
        loadDraft,
        submitForm,
        goToStep,
        nextStep,
        previousStep,
        generateFormConfig,
    };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
};

export default FormContext;