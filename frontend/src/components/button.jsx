import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    className = '',
    icon: Icon,
    iconPosition = 'left',
    fullWidth = false,
    ...props
}) => {
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg shadow-blue-600/25',
        secondary: 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg shadow-blue-500/25',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
        ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
        danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg shadow-red-500/25',
        success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg shadow-green-500/25',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-lg shadow-yellow-500/25',
        dark: 'bg-gray-800 text-white hover:bg-gray-900 hover:shadow-lg shadow-gray-800/25',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-8 py-3.5 text-base',
        xl: 'px-10 py-4 text-lg',
    };

    const baseStyles = 'rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';

    return (
        <motion.button
            whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
            whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{children}</span>
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
                    <span>{children}</span>
                    {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
                </>
            )}
        </motion.button>
    );
};

export default Button;