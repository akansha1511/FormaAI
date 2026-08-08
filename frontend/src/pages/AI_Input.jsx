import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSend, FiTrash2, FiZap, FiClock, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { useForm } from '../context/FormContext';
import { aiService } from '../services'; 
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';

const AIInput = () => {
    const [inputText, setInputText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showTips, setShowTips] = useState(true);
    const [error, setError] = useState(null);
    const { setExtractedData, generateFormConfig } = useForm();
    const navigate = useNavigate();

    const handleGenerate = async () => {
        if (!inputText.trim()) {
            alert('Please describe your incident first');
            return;
        }

        setIsProcessing(true);
        setError(null);
        setProgress(0);

        try {
            //  Step 1: Call Backend AI Service
            const steps = [
                { progress: 20, message: 'Sending to AI...' },
                { progress: 50, message: 'AI processing...' },
                { progress: 80, message: 'Extracting data...' },
                { progress: 95, message: 'Generating form...' },
                { progress: 100, message: 'Complete!' },
            ];

            for (const step of steps) {
                await new Promise(resolve => setTimeout(resolve, 400));
                setProgress(step.progress);
            }

            //  Call backend AI extraction
            const result = await aiService.extract(inputText);

            if (!result.success) {
                throw new Error(result.message || 'AI extraction failed');
            }

            //  Save extracted data
            const extractedData = result.data || result;
            setExtractedData(extractedData);
            generateFormConfig(extractedData);

            //  Navigate to review page
            setTimeout(() => {
                navigate('/review');
            }, 300);

        } catch (error) {
            console.error('Processing Error:', error);
            setError(error.message || 'Failed to process your request');
            alert(error.message || 'Error processing your request. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClear = () => {
        setInputText('');
        setProgress(0);
        setError(null);
    };

    // ... rest of your component (same as before)

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* ... same header, tips, textarea, progress bar ... */}

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                    {error}
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleGenerate}
                    disabled={isProcessing || !inputText.trim()}
                    className="shadow-lg shadow-blue-500/25"
                >
                    {isProcessing ? 'Processing...' : (
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
        </div>
    );
};

export default AIInput;
