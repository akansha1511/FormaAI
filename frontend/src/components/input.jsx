import React, { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

const Input = forwardRef(({
    label,
    error,
    className = '',
    required = false,
    icon: Icon,
    helper = '',
    type = 'text',
    success = false,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <input
                    ref={ref}
                    type={inputType}
                    className={`
            w-full px-4 py-3 rounded-xl border 
            transition-all duration-300 outline-none bg-white/50
            ${Icon ? 'pl-10' : ''} 
            ${isPassword ? 'pr-12' : ''}
            ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}
            ${success ? 'border-green-500 focus:ring-green-500/20 focus:border-green-500' : ''}
            ${!error && !success ? 'border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20' : ''}
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                )}

                {error && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <FiAlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                )}
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-sm text-red-500 flex items-center space-x-1"
                    >
                        <FiAlertCircle className="w-4 h-4" />
                        <span>{error}</span>
                    </motion.p>
                )}
            </AnimatePresence>

            {helper && !error && (
                <p className="text-xs text-gray-400">{helper}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;