import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSend, FiTrash2, FiZap, FiClock, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
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

    //  Format date: DD/MM/YYYY
    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    //  Format time: HH:MM AM/PM (12-hour format)
    const formatTime = (date) => {
        const d = new Date(date);
        let hours = d.getHours();
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    const handleGenerate = async () => {
        if (!inputText.trim()) {
            alert('Please describe your incident first');
            return;
        }
        
        setIsProcessing(true);
        setProgress(0);
        
        try {
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
                console.log(step.message);
            }

            //  Get current date/time
            const now = new Date();
            const formattedDate = formatDate(now);
            const formattedTime = formatTime(now);

            //  Extract data from user's text
            const extractedData = {
                incidentType: detectIncidentType(inputText),
                date: extractDate(inputText) || formattedDate,
                time: extractTime(inputText) || formattedTime,
                description: inputText,
                location: extractLocation(inputText) || 'Not specified',
                severity: extractSeverity(inputText) || 'Medium',
                extractedAt: `${formattedDate} at ${formattedTime}`,
                extractedAtFull: now.toISOString()
            };

            setExtractedData(extractedData);
            generateFormConfig(extractedData);
            
            setTimeout(() => {
                console.log('Navigating to form...');
                navigate('/form');
            }, 500);
            
        } catch (error) {
            console.error('AI Processing Error:', error);
            alert('Error processing your request. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    //  Helper functions for extraction
    const detectIncidentType = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('car') || lower.includes('accident') || lower.includes('driving') || lower.includes('vehicle') || lower.includes('crash')) {
            return 'Car Accident';
        } else if (lower.includes('burglary') || lower.includes('stole') || lower.includes('theft') || lower.includes('robbery')) {
            return 'Theft/Burglary';
        } else if (lower.includes('fire') || lower.includes('smoke') || lower.includes('burn') || lower.includes('flame')) {
            return 'Fire Damage';
        } else if (lower.includes('hospital') || lower.includes('medical') || lower.includes('doctor') || lower.includes('surgery') || lower.includes('health')) {
            return 'Medical Claim';
        } else if (lower.includes('work') || lower.includes('office') || lower.includes('employee') || lower.includes('workplace')) {
            return 'Workplace Incident';
        } else if (lower.includes('flight') || lower.includes('luggage') || lower.includes('travel') || lower.includes('trip')) {
            return 'Travel Claim';
        } else if (lower.includes('property') || lower.includes('home') || lower.includes('house') || lower.includes('damage')) {
            return 'Property Damage';
        }
        return 'General Incident';
    };

    //  Extract date from text (supports multiple formats)
    const extractDate = (text) => {
        const patterns = [
            // DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
            /\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})\b/,
            // YYYY-MM-DD
            /\b(\d{4})-(\d{2})-(\d{2})\b/,
            // Month DD, YYYY
            /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/i,
            // DD Month YYYY
            /(\d{1,2})(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i,
        ];

        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match) {
                // If it's a date with month name
                if (match[1] && match[2] && match[3] && isNaN(match[1])) {
                    // Month DD, YYYY or DD Month YYYY
                    const monthNames = ['january','february','march','april','may','june','july','august','september','october','november','december'];
                    const monthIndex = monthNames.indexOf(match[1].toLowerCase());
                    const day = match[2].replace(/st|nd|rd|th/, '');
                    return `${String(day).padStart(2, '0')}/${String(monthIndex + 1).padStart(2, '0')}/${match[3]}`;
                }
                // If it's a date with numbers
                if (match[1] && match[2] && match[3] && !isNaN(match[1])) {
                    // Check if first group is year (YYYY-MM-DD)
                    if (match[1].length === 4) {
                        return `${match[3]}/${match[2]}/${match[1]}`;
                    }
                    // DD/MM/YYYY or MM/DD/YYYY - assume DD/MM/YYYY
                    return `${String(match[1]).padStart(2, '0')}/${String(match[2]).padStart(2, '0')}/${match[3]}`;
                }
            }
        }
        return null;
    };

    //  Extract time from text
    const extractTime = (text) => {
        const patterns = [
            // HH:MM AM/PM
            /(\d{1,2}):(\d{2})\s*(AM|PM)/i,
            // HH:MM (24-hour)
            /(\d{1,2}):(\d{2})\b/,
            // HH AM/PM
            /(\d{1,2})\s*(AM|PM)/i,
        ];

        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match) {
                let hours = parseInt(match[1]);
                const minutes = match[2] || '00';
                let ampm = match[3] || '';

                // If no AM/PM, determine from hours
                if (!ampm) {
                    if (hours >= 12) {
                        ampm = 'PM';
                        if (hours > 12) hours = hours - 12;
                    } else {
                        ampm = 'AM';
                        if (hours === 0) hours = 12;
                    }
                } else {
                    // Convert 24-hour to 12-hour
                    if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
                    if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
                    // Convert back to 12-hour format
                    if (hours >= 12) {
                        ampm = 'PM';
                        if (hours > 12) hours = hours - 12;
                    } else {
                        ampm = 'AM';
                        if (hours === 0) hours = 12;
                    }
                }
                return `${hours}:${minutes} ${ampm}`;
            }
        }
        return null;
    };

    const extractLocation = (text) => {
        const patterns = [
            /(?:in|at|near)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
            /(?:highway|road|street|lane|avenue|drive)\s+([A-Z0-9]+)/i,
            /(?:at|in)\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/,
        ];
        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match) return match[1];
        }
        return null;
    };

    const extractSeverity = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('critical') || lower.includes('severe') || lower.includes('major') || lower.includes('serious')) return 'Critical';
        if (lower.includes('moderate') || lower.includes('medium') || lower.includes('some')) return 'Medium';
        if (lower.includes('minor') || lower.includes('low') || lower.includes('small') || lower.includes('slight')) return 'Low';
        return 'Medium';
    };

    const handleClear = () => {
        console.log('Clearing input');
        setInputText('');
        setProgress(0);
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
                    Write a detailed description and our AI will generate a dynamic form for you.
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
                                    <FiInfo className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Tips for better results</h4>
                                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                        <li className="flex items-center space-x-2">
                                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Include specific details like <strong>date, time, and location</strong></span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Describe the <strong>sequence of events</strong> clearly</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Mention any <strong>people involved or witnesses</strong></span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Include <strong>estimated damages or losses</strong> if applicable</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    console.log('Hiding tips');
                                    setShowTips(false);
                                }}
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
                        placeholder={`Describe your incident in detail...

Include:
📅 Date & Time of incident (e.g., 15/07/2026 at 3:30 PM)
📍 Location where it happened
📝 What exactly happened
👤 People involved
💡 Any witnesses or evidence
💰 Estimated damages or losses

Example:
"Yesterday evening at around 6:30 PM, I was driving my Honda City on NH48 highway when a truck lost control and hit my car. The front bumper and left headlight are damaged. No injuries. Police filed an FIR."`}
                        className="w-full h-64 p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 outline-none resize-none text-gray-900 placeholder-gray-400"
                    />
                    
                    <div className="flex flex-wrap gap-3">
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
                    onClick={() => {
                        console.log('Navigating to dashboard');
                        navigate('/dashboard');
                    }}
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
