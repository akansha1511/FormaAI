import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiChevronLeft,
    FiChevronRight,
    FiSave,
    FiCheckCircle,
    FiAlertCircle,
    FiFileText,
    FiUser,
    FiMapPin,
    FiCalendar,
    FiClock,
    FiPhone,
    FiMail,
    FiInfo
} from 'react-icons/fi';
import { useForm } from '../context/FormContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Loader from '../components/Loader';

const DynamicForm = () => {
    const {
        formData,
        setField,
        formConfig,
        currentStep,
        setCurrentStep,
        submitForm,
        saveDraft,
        isLoading,
        errors,
        setFieldError,
        clearErrors
    } = useForm();

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // If no form config, redirect to AI input
        if (!formConfig) {
            navigate('/ai-input');
        }
    }, [formConfig, navigate]);

    const currentSection = formConfig?.sections?.[currentStep];
    const totalSteps = formConfig?.sections?.length || 0;
    const isLastStep = currentStep === totalSteps - 1;
    const isFirstStep = currentStep === 0;

    const handleNext = () => {
        // Validate current section
        if (currentSection?.fields) {
            let hasError = false;
            currentSection.fields.forEach(field => {
                if (field.required && !formData[field.id]) {
                    setFieldError(field.id, `${field.label} is required`);
                    hasError = true;
                }
            });
            if (hasError) return;
        }

        clearErrors();
        if (isLastStep) {
            handleSubmit();
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (!isFirstStep) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const result = await submitForm();
            if (result.success) {
                navigate('/review');
            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = () => {
        saveDraft();
    };

    const renderField = (field) => {
        const value = formData[field.id] || '';
        const error = errors[field.id];

        switch (field.type) {
            case 'text':
            case 'email':
            case 'tel':
                return (
                    <Input
                        key={field.id}
                        label={field.label}
                        type={field.type}
                        value={value}
                        onChange={(e) => setField(field.id, e.target.value)}
                        required={field.required}
                        error={error}
                        icon={getFieldIcon(field.id)}
                        placeholder={field.placeholder || `Enter ${field.label}`}
                    />
                );

            case 'textarea':
                return (
                    <div key={field.id} className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <textarea
                            value={value}
                            onChange={(e) => setField(field.id, e.target.value)}
                            rows={4}
                            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none bg-white/50
                ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'}`}
                            placeholder={field.placeholder || `Enter ${field.label}`}
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                );

            case 'select':
                return (
                    <div key={field.id} className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <select
                            value={value}
                            onChange={(e) => setField(field.id, e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none bg-white/50
                ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'}`}
                        >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                );

            case 'date':
                return (
                    <Input
                        key={field.id}
                        label={field.label}
                        type="date"
                        value={value}
                        onChange={(e) => setField(field.id, e.target.value)}
                        required={field.required}
                        error={error}
                        icon={FiCalendar}
                    />
                );

            case 'checkbox':
                return (
                    <div key={field.id} className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setField(field.id, e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    </div>
                );

            case 'radio':
                return (
                    <div key={field.id} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                        <div className="flex flex-wrap gap-4">
                            {field.options?.map((option) => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={field.id}
                                        value={option}
                                        checked={value === option}
                                        onChange={(e) => setField(field.id, e.target.value)}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                );

            default:
                return null;
        }
    };

    const getFieldIcon = (fieldId) => {
        const icons = {
            fullName: FiUser,
            email: FiMail,
            phone: FiPhone,
            location: FiMapPin,
            date: FiCalendar,
            time: FiClock,
        };
        return icons[fieldId] || null;
    };

    const getSectionIcon = (sectionId) => {
        const icons = {
            personal: FiUser,
            incident: FiAlertCircle,
            additional: FiInfo,
        };
        return icons[sectionId] || FiFileText;
    };

    if (!formConfig) {
        return <Loader fullScreen text="Loading form..." />;
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                        Step {currentStep + 1} of {totalSteps}
                    </span>
                    <div className="flex space-x-1">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <div
                                key={index}
                                className={`w-8 h-1 rounded-full transition-all duration-300 ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSaveDraft}>
                    <FiSave className="mr-2" />
                    Save Draft
                </Button>
            </div>

            {/* Section Header */}
            <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-linear-to-r from-blue-600/10 to-cyan-500/10">
                    {React.createElement(getSectionIcon(currentSection?.id), { className: "w-6 h-6 text-blue-600" })}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentSection?.title}</h2>
                    <p className="text-sm text-gray-500">Please fill in all required fields</p>
                </div>
            </div>

            {/* Form Fields */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-6 space-y-6">
                        {currentSection?.fields.map((field) => (
                            <div key={field.id}>
                                {renderField(field)}
                            </div>
                        ))}
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={isFirstStep || isSubmitting}
                    className={isFirstStep ? 'opacity-50 cursor-not-allowed' : ''}
                >
                    <FiChevronLeft className="mr-2" />
                    Previous
                </Button>

                <div className="flex-1" />

                <Button
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                >
                    <FiSave className="mr-2" />
                    Save Draft
                </Button>

                <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    className="shadow-lg shadow-blue-500/25"
                >
                    {isLastStep ? (
                        <>
                            <FiCheckCircle className="mr-2" />
                            Submit Form
                        </>
                    ) : (
                        <>
                            Next
                            <FiChevronRight className="ml-2" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default DynamicForm;
