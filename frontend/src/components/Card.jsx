import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    hoverable = false,
    premium = false,
    glass = false,
    dark = false,
    padding = 'md',
    ...props
}) => {
    const paddingMap = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
    };

    const baseClasses = 'rounded-2xl transition-all duration-300';
    const hoverClasses = hoverable ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';
    const glassClasses = glass ? 'glass' : '';
    const darkClasses = dark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white';
    const premiumClasses = premium ? 'card-premium' : 'border border-gray-100/50 shadow-sm';
    const paddingClass = paddingMap[padding] || paddingMap.md;

    return (
        <motion.div
            className={`${baseClasses} ${darkClasses} ${premiumClasses} ${glassClasses} ${hoverClasses} ${paddingClass} ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
