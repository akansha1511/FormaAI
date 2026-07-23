import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // 
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { register } = useAuth();
    const navigate = useNavigate();  // 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (!agreeTerms) {
            setError('Please agree to the Terms of Service');
            return;
        }

        setIsLoading(true);
        
        try {
            const result = await register(name, email, password);
            if (result.success) {
                console.log('Registration successful!');
                navigate('/dashboard');
            } else {
                setError(result.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const passwordRequirements = [
        { text: 'At least 8 characters', met: password.length >= 8 },
        { text: 'Contains at least one uppercase letter', met: /[A-Z]/.test(password) },
        { text: 'Contains at least one lowercase letter', met: /[a-z]/.test(password) },
        { text: 'Contains at least one number', met: /[0-9]/.test(password) },
    ];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-500 mt-2">Start your free trial today</p>
            </div>

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                >
                    {error}
                </motion.div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    icon={FiUser}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    icon={FiMail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Create a strong password"
                    icon={FiLock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    icon={FiLock}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {/* Password Requirements */}
                {password && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2 p-4 bg-gray-50 rounded-xl"
                    >
                        <p className="text-xs font-medium text-gray-600">Password Requirements:</p>
                        {passwordRequirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <FiCheckCircle className={`w-4 h-4 ${req.met ? 'text-green-500' : 'text-gray-300'}`} />
                                <span className={`text-xs ${req.met ? 'text-gray-700' : 'text-gray-400'}`}>
                                    {req.text}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Terms Agreement */}
                <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                    />
                    <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">
                            Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">
                            Privacy Policy
                        </Link>
                    </span>
                </label>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                    className="shadow-lg shadow-blue-500/25"
                >
                    Create Account
                </Button>
            </form>

            
            <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{' '}
                <button
                    onClick={() => {
                        console.log('Sign in clicked - navigating to login');
                        navigate('/login');
                    }}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                    Sign in
                </button>
            </p>
        </div>
    );
};

export default Register;
