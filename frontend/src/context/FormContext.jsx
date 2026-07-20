import React, { createContext, useState, useContext, useEffect } from 'react';

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
  const [formStatus, setFormStatus] = useState('draft'); // 'draft' | 'submitted' | 'review'

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('formDraft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
      } catch (e) {
        localStorage.removeItem('formDraft');
      }
    }
  }, []);

  // Update form data
  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Auto-save draft after update
    autoSaveDraft({ ...formData, ...data });
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
    // Auto-save draft
    autoSaveDraft({ ...formData, [fieldName]: value });
  };

  // Auto-save draft to localStorage
  const autoSaveDraft = (data) => {
    try {
      localStorage.setItem('formDraft', JSON.stringify(data || formData));
    } catch (e) {
      console.warn('Failed to auto-save draft:', e);
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

  // Validate a single field
  const validateField = (fieldName, value, rules = {}) => {
    if (rules.required && !value) {
      return `${fieldName} is required`;
    }
    if (rules.minLength && value?.length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`;
    }
    if (rules.maxLength && value?.length > rules.maxLength) {
      return `${fieldName} must be at most ${rules.maxLength} characters`;
    }
    if (rules.email && !/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address';
    }
    if (rules.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)) {
      return 'Please enter a valid phone number';
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.patternMessage || 'Invalid format';
    }
    return null;
  };

  // Validate entire form
  const validateForm = (data = formData) => {
    const newErrors = {};
    const fields = formConfig?.sections?.flatMap(s => s.fields) || [];
    
    fields.forEach(field => {
      const value = data[field.id];
      if (field.required && !value) {
        newErrors[field.id] = `${field.label} is required`;
      }
      if (field.validation) {
        const error = validateField(field.id, value, field.validation);
        if (error) {
          newErrors[field.id] = error;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    setFormStatus('draft');
    localStorage.removeItem('formDraft');
  };

  // Save draft
  const saveDraft = () => {
    setDraftSaved(true);
    autoSaveDraft();
    setFormStatus('draft');
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

  // Check if draft exists
  const hasDraft = () => {
    return localStorage.getItem('formDraft') !== null;
  };

  // Submit form
  const submitForm = async () => {
    // Validate before submit
    if (!validateForm()) {
      return { success: false, errors: 'Please fix all errors before submitting' };
    }

    setIsLoading(true);
    try {
      // Simulate API submission - Replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft after successful submission
      localStorage.removeItem('formDraft');
      setIsSubmitted(true);
      setFormStatus('submitted');
      
      return { success: true };
    } catch (error) {
      setFormStatus('error');
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
    // Validate current section before moving forward
    const currentSection = formConfig?.sections?.[currentStep];
    if (currentSection?.fields) {
      const sectionData = {};
      currentSection.fields.forEach(field => {
        sectionData[field.id] = formData[field.id];
      });
      // Only validate if fields exist
      if (Object.keys(sectionData).length > 0) {
        // Simple validation for current section
        let hasError = false;
        currentSection.fields.forEach(field => {
          if (field.required && !formData[field.id]) {
            setFieldError(field.id, `${field.label} is required`);
            hasError = true;
          }
        });
        if (hasError) {
          return false;
        }
      }
    }
    
    if (currentStep < (formConfig?.sections?.length || 1) - 1) {
      setCurrentStep(currentStep + 1);
      return true;
    }
    return false;
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      return true;
    }
    return false;
  };

  // Generate form config from extracted data
  const generateFormConfig = (extractedData) => {
    setExtractedData(extractedData);
    
    // This would be dynamically generated based on the extracted data
    // For demo, we'll create a sample config
    const config = {
      sections: [
        {
          id: 'personal',
          title: 'Personal Information',
          fields: [
            { 
              id: 'fullName', 
              type: 'text', 
              label: 'Full Name', 
              required: true,
              validation: { minLength: 2, maxLength: 50 }
            },
            { 
              id: 'email', 
              type: 'email', 
              label: 'Email Address', 
              required: true,
              validation: { email: true }
            },
            { 
              id: 'phone', 
              type: 'tel', 
              label: 'Phone Number',
              validation: { phone: true }
            },
          ]
        },
        {
          id: 'incident',
          title: 'Incident Details',
          fields: [
            { 
              id: 'type', 
              type: 'select', 
              label: 'Incident Type', 
              options: ['Accident', 'Theft', 'Damage', 'Other'], 
              required: true 
            },
            { 
              id: 'date', 
              type: 'date', 
              label: 'Date of Incident', 
              required: true 
            },
            { 
              id: 'description', 
              type: 'textarea', 
              label: 'Description', 
              required: true,
              validation: { minLength: 10, maxLength: 1000 }
            },
          ]
        },
        {
          id: 'additional',
          title: 'Additional Information',
          fields: [
            { 
              id: 'witnesses', 
              type: 'text', 
              label: 'Witnesses' 
            },
            { 
              id: 'policeReport', 
              type: 'checkbox', 
              label: 'Police Report Filed' 
            },
            { 
              id: 'severity', 
              type: 'radio', 
              label: 'Severity', 
              options: ['Low', 'Medium', 'High', 'Critical'] 
            },
          ]
        }
      ]
    };
    
    setFormConfig(config);
    return config;
  };

  // Get current section
  const getCurrentSection = () => {
    return formConfig?.sections?.[currentStep] || null;
  };

  // Get total steps
  const getTotalSteps = () => {
    return formConfig?.sections?.length || 0;
  };

  // Check if form is complete
  const isFormComplete = () => {
    if (!formConfig) return false;
    const fields = formConfig.sections.flatMap(s => s.fields);
    for (const field of fields) {
      if (field.required && !formData[field.id]) {
        return false;
      }
    }
    return true;
  };

  // Get form progress percentage
  const getProgress = () => {
    if (!formConfig) return 0;
    const totalSteps = formConfig.sections.length;
    return ((currentStep + 1) / totalSteps) * 100;
  };

  // Value object to provide to consumers
  const value = {
    // State
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
    formStatus,
    setFormStatus,

    // Data operations
    updateFormData,
    setField,
    setFieldError,
    clearErrors,
    validateField,
    validateForm,

    // Form actions
    resetForm,
    saveDraft,
    loadDraft,
    hasDraft,
    submitForm,

    // Navigation
    goToStep,
    nextStep,
    previousStep,

    // Config
    generateFormConfig,
    getCurrentSection,
    getTotalSteps,

    // Utilities
    isFormComplete,
    getProgress,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
