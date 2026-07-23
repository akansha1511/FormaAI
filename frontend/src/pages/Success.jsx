import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    FiCheckCircle, 
    FiHome, 
    FiFileText, 
    FiPlus,
    FiShare2,
    FiDownload
} from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../context/FormContext';

//  Helper functions
const getFormCounter = () => {
    return parseInt(localStorage.getItem('formCount') || '0');
};

const getReferenceNumber = () => {
    const year = new Date().getFullYear();
    const count = getFormCounter() + 1;
    return `F-${year}-${String(count).padStart(3, '0')}`;
};

const Success = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const { user } = useAuth();
    const { formData, extractedData, resetForm } = useForm();

    useEffect(() => {
        console.log('Success page loaded! 🎉');
        const timer = setTimeout(() => setShowConfetti(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    const handleShareFeedback = () => {
        console.log('Share Feedback clicked');
        alert('📝 Share your feedback!\n\nWe\'d love to hear your thoughts about Forma AI.');
    };

    const handleDownloadPDF = () => {
        console.log('Download PDF clicked');
        alert('📄 PDF download will be available soon!\n\nYour form summary will be downloaded as a PDF.');
    };

    //  Get dynamic stats
    const formsProcessed = getFormCounter() + 1;
    const referenceNumber = getReferenceNumber();

    return (
        <div className="max-w-2xl mx-auto py-12 text-center">
            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                <div className="w-32 h-32 mx-auto relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse" />
                    <div className="absolute inset-2 bg-green-500/30 rounded-full animate-pulse delay-150" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/25">
                            <FiCheckCircle className="w-14 h-14 text-white" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Confetti Particles */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: -20,
                                scale: Math.random() * 1 + 0.5,
                                rotate: 0
                            }}
                            animate={{
                                y: window.innerHeight + 50,
                                rotate: Math.random() * 720,
                                x: Math.random() * 200 - 100 + Math.random() * window.innerWidth / 2
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                delay: Math.random() * 2,
                                ease: "easeOut"
                            }}
                            className={`absolute w-3 h-3 rounded-full ${
                                ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500'][Math.floor(Math.random() * 7)]
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* Success Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
            >
                <h1 className="text-4xl font-bold text-gray-900">Form Submitted Successfully! 🎉</h1>
                <p className="text-gray-500 mt-3 text-lg">
                    Your form has been received and is being processed.
                    You will receive a confirmation email shortly.
                </p>
            </motion.div>

            {/*  UPDATED Stats Cards with Dynamic Data */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid sm:grid-cols-3 gap-4 mt-8"
            >
                {/*  Dynamic Reference Number */}
                <Card className="p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">
                        {referenceNumber}
                    </p>
                    <p className="text-xs text-gray-500">Reference Number</p>
                </Card>
                
                {/*  Dynamic Forms Processed */}
                <Card className="p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">
                        {formsProcessed}
                    </p>
                    <p className="text-xs text-gray-500">Forms Processed</p>
                </Card>
                
                <Card className="p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                    <p className="text-xs text-gray-500">Accuracy Rate</p>
                </Card>
            </motion.div>

            {/* Next Steps */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
            >
                <h3 className="font-semibold text-gray-900 mb-4">What would you like to do next?</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link to="/dashboard">
                        <Card hoverable className="p-4 text-center h-full">
                            <FiHome className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-700">Go to Dashboard</p>
                        </Card>
                    </Link>
                    <Link to="/ai-input">
                        <Card hoverable className="p-4 text-center h-full">
                            <FiPlus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-700">Create New Form</p>
                        </Card>
                    </Link>
                    <Link to="/forms">
                        <Card hoverable className="p-4 text-center h-full">
                            <FiFileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-700">View All Forms</p>
                        </Card>
                    </Link>
                    <Card 
                        hoverable 
                        className="p-4 text-center h-full cursor-pointer"
                        onClick={handleShareFeedback}
                    >
                        <FiShare2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Share Feedback</p>
                    </Card>
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
            >
                <Button
                    variant="primary"
                    onClick={handleDownloadPDF}
                    className="shadow-lg shadow-blue-500/25"
                >
                    <FiDownload className="mr-2" />
                    Download PDF
                </Button>
                <Link to="/dashboard">
                    <Button variant="outline">
                        <FiHome className="mr-2" />
                        Return to Dashboard
                    </Button>
                </Link>
            </motion.div>

            {/* Footer Note */}
            <p className="text-xs text-gray-400 mt-8">
                A confirmation email has been sent to your registered email address.
                If you don't see it, please check your spam folder.
            </p>
        </div>
    );
};

export default Success;
