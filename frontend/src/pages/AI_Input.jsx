import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSend, FiTrash2, FiZap, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useForm } from '../context/FormContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';

const AIInput = () => {
    const [inputText, setInputText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showTips, setShowTips] = useState(true);
    const { setExtractedData, generateFormConfig } = useForm();
    const navigate = useNavigate();

    const exampleText = `Yesterday evening at around 6:30 PM, I was driving my Honda City on NH48 highway near the Bishanpur exit. Suddenly, a truck coming from the opposite direction lost control and swerved into my lane. I tried to avoid the collision but couldn't. The impact was on the front left side of my car. There were no injuries, but my car has significant damage to the front bumper and left headlight. The police arrived and filed an FIR. The truck driver admitted fault and has insurance with ICICI Lombard.`;

    const handleGenerate = async () => {
        if (!inputText.trim()) return;

        setIsProcessing(true);
        setProgress(0);

        try {
            // Simulate AI processing with progress
            const steps = [
                { progress: 20, message: 'Analyzing text...' },
                { progress: 45, message: 'Extracting entities...' },
                { progress: 70, message: 'Structuring data...' },
                { progress: 90, message: 'Generating form...' },
                { progress: 100, message: 'Complete!' },
            ];

            for (const step of steps) {
                await new Promise(resolve => setTimeout(resolve, 600));
                setProgress(step.progress);
            }

            // Mock extracted data
            const extractedData = {
                incidentType: 'Car Accident',
                date: '2024-01-15',
                time: '18:30',
                location: 'NH48, Bishanpur',
                vehicle: 'Honda City',
                description: inputText,
                severity: 'Major',
                injuries: 'None',
                policeReport: 'Yes',
                insurance: 'ICICI Lombard',
                driverName: 'John Doe',
                driverContact: '+91 9876543210',
            };

            setExtractedData(extractedData);

            // Generate form config from extracted data
            generateFormConfig(extractedData);

            // Navigate to form
            setTimeout(() => {
                navigate('/form');
            }, 500);

        } catch (error) {
            console.error('AI Processing Error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClear = () => {
        setInputText('');
        setProgress(0);
    };

    const handleExample = () => {
        setInputText(exampleText);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-600/10 to-cyan-500/10 text-blue-600 text-sm font-medium mb-4"
                >
                    <FiZap className="w-4 h-4" />
                    <span>AI-Powered Form Generation</span>
                </motion.div>
                <h1 className="text-3xl font-bold text-gray-900">Describe Your Incident</h1>
                <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                    Write a detailed description of what happened. Our AI will extract key information and generate a dynamic form for you.
                </p>
            </div>

            {/* Tips Card */}
            {showTips && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="p-6 bg-linear-to-r from-blue-600/5 to-cyan-500/5 border-blue-600/10">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                <div className="p-2 rounded-xl bg-blue-600/10 mt-1">
                                    <FiZap className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Tips for better results</h4>
                                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                        <li className="flex items-center space-x-2">
                                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Include specific details like date, time, and location</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Describe the sequence of events clearly</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Mention any people involved or witnesses</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowTips(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FiAlertCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </Card>
                </motion.div>
            )}

            {/* Input Area */}
            <Card className="p-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                            Incident Description <span className="text-red-500">*</span>
                        </label>
                        <span className="text-xs text-gray-400">
                            {inputText.length} characters
                        </span>
                    </div>

                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Describe your incident in detail. Be specific about what happened, when, where, and who was involved..."
                        className="w-full h-64 p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 outline-none resize-none text-gray-900 placeholder-gray-400"
                    />

                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={handleExample}
                            variant="outline"
                            size="sm"
                            disabled={isProcessing}
                        >
                            📝 Use Example
                        </Button>
                        <Button
                            onClick={handleClear}
                            variant="ghost"
                            size="sm"
                            disabled={isProcessing || !inputText}
                        >
                            <FiTrash2 className="mr-2" />
                            Clear
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Processing Progress */}
            {isProcessing && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <Loader size="sm" />
                                <span className="text-sm font-medium text-gray-700">Processing your description...</span>
                            </div>
                            <span className="text-sm font-semibold text-blue-600">{progress}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                                className="h-full bg-linear-to-r from-blue-600 to-cyan-400 rounded-full"
                            />
                        </div>

                        <div className="mt-4 grid grid-cols-4 gap-2">
                            {['Analyzing', 'Extracting', 'Structuring', 'Generating'].map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className={`w-2 h-2 mx-auto rounded-full ${progress > index * 25 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                                    <p className="text-xs text-gray-500 mt-1">{step}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleGenerate}
                    disabled={isProcessing || !inputText.trim()}
                    className="shadow-lg shadow-blue-500/25"
                >
                    {isProcessing ? (
                        <>Processing...</>
                    ) : (
                        <>
                            <FiSend className="mr-2" />
                            Generate Form
                        </>
                    )}
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={() => navigate('/dashboard')}
                    disabled={isProcessing}
                >
                    Cancel
                </Button>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: FiZap, label: 'AI Powered', color: 'text-blue-600' },
                    { icon: FiClock, label: 'Real-time', color: 'text-cyan-600' },
                    { icon: FiCheckCircle, label: '98% Accuracy', color: 'text-emerald-600' },
                    { icon: FiAlertCircle, label: 'Auto-Save', color: 'text-amber-600' },
                ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AIInput;