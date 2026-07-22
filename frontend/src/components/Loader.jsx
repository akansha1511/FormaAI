import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({
    size = 'md',
    fullScreen = false,
    text = 'Loading...',
    variant = 'primary'
}) => {
    const sizeMap = {
        sm: 'w-5 h-5 border-2',
        md: 'w-10 h-10 border-4',
        lg: 'w-16 h-16 border-4',
        xl: 'w-24 h-24 border-4',
    };

    const colorMap = {
        primary: 'border-blue-600/20 border-t-blue-600',
        secondary: 'border-blue-500/20 border-t-blue-500',
        white: 'border-white/20 border-t-white',
        gray: 'border-gray-300/20 border-t-gray-600',
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center space-y-3">
            <motion.div
                className={`${sizeMap[size]} ${colorMap[variant]} rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            {text && (
                <p className="text-sm text-gray-500 font-medium animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white/90 rounded-2xl p-8 shadow-2xl">
                    {spinner}
                </div>
            </div>
        );
    }

    return spinner;
};

export default Loader;
