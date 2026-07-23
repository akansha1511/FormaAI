import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiCheckCircle,
    FiEdit,
    FiSend,
    FiArrowLeft,
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiClock,
    FiFileText,
    FiAlertCircle,
    FiCheck
} from 'react-icons/fi';
import { useForm } from '../context/FormContext';
import Button from '../components/Button';
import Card from '../components/Card';

const Review = () => {
    const { formData, extractedData, resetForm } = useForm();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Simulate API submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            setShowSuccess(true);
            setTimeout(() => {
                resetForm();
                navigate('/success');
            }, 1500);
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = () => {
        navigate('/form');
    };

    const getFieldIcon = (fieldId) => {
        const icons = {
            fullName: FiUser,
            email: FiMail,
            phone: FiPhone,
            location: FiMapPin,
            date: FiCalendar,
            time: FiClock,
            type: FiAlertCircle,
            description: FiFileText,
        };
        return icons[fieldId] || FiCheck;
    };

    const formatFieldLabel = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    };

    const renderValue = (value) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        return value || 'Not provided';
    };

    // Combine formData and extractedData for review
    const reviewData = { ...extractedData, ...formData };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-4"
                >
                    <FiCheckCircle className="w-4 h-4" />
                    <span>Review Your Form</span>
                </motion.div>
                <h1 className="text-3xl font-bold text-gray-900">Review & Submit</h1>
                <p className="text-gray-500 mt-2">
                    Please review all information before submitting. You can edit any field if needed.
                </p>
            </div>

            {/* Review Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(reviewData).map(([key, value]) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="p-6 h-full">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                    <div className="p-2 rounded-lg bg-blue-600/10 mt-0.5">
                                        {React.createElement(getFieldIcon(key), { className: "w-4 h-4 text-blue-600" })}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {formatFieldLabel(key)}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 mt-1 wrap-break-word">
                                            {renderValue(value)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    variant="outline"
                    onClick={() => navigate('/form')}
                    disabled={isSubmitting}
                >
                    <FiArrowLeft className="mr-2" />
                    Back to Form
                </Button>

                <div className="flex-1" />

                <Button
                    variant="outline"
                    onClick={handleEdit}
                    disabled={isSubmitting}
                >
                    <FiEdit className="mr-2" />
                    Edit
                </Button>

                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    className="shadow-lg shadow-blue-500/25"
                >
                    <FiSend className="mr-2" />
                    Submit Form
                </Button>
            </div>

            {/* Success Animation Overlay */}
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.6 }}
                        className="bg-white rounded-3xl p-12 text-center max-w-sm mx-4"
                    >
                        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                            <FiCheck className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Submitting...</h3>
                        <p className="text-gray-500 mt-2">Please wait while we process your form.</p>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Review;
