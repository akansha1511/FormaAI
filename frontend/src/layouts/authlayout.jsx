import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
            </div>

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <Logo className="justify-center" />
                    </Link>
                    <p className="mt-2 text-sm text-gray-500">
                        AI-Augmented Dynamic Form Engine
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
                    <Outlet />
                </div>

                {/* Footer Links */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        By continuing, you agree to our{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                            Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                {/* Decorative Bottom Text */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        © 2024 Forma AI. All rights reserved.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;