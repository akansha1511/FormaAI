import React from 'react';
import { FiZap } from 'react-icons/fi';

const Logo = ({ className = '' }) => {
    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <div className="p-2 rounded-xl bg-linear-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25">
                <FiZap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">
                <span className="text-blue-600">Forma</span>
                <span className="text-blue-500">AI</span>
            </span>
        </div>
    );
};

export default Logo;