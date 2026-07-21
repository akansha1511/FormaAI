import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiHome,
    FiFileText,
    FiEdit,
    FiCheckCircle,
    FiPlusCircle,
    FiSettings,
    FiUsers,
    FiBarChart2,
    FiHelpCircle,
    FiLogOut,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    const navItems = [
        { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
        { path: '/ai-input', icon: FiEdit, label: 'New Form' },
        { path: '/form', icon: FiFileText, label: 'Current Form' },
        { path: '/review', icon: FiCheckCircle, label: 'Review' },
        { path: '/analytics', icon: FiBarChart2, label: 'Analytics' },
    ];

    const bottomItems = [
        { path: '/settings', icon: FiSettings, label: 'Settings' },
        { path: '/help', icon: FiHelpCircle, label: 'Help' },
    ];

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white/80 backdrop-blur-lg border-r border-gray-100/50 hidden lg:block overflow-y-auto">
            <div className="p-6 flex flex-col h-full">
                {/* User Info */}
                <div className="flex items-center space-x-3 pb-6 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.name || 'Guest'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user?.email || 'guest@example.com'}
                        </p>
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="mt-6 space-y-1 flex-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-blue-600/10 text-blue-600 font-medium'
                                    : 'text-gray-700/60 hover:text-gray-900 hover:bg-gray-50'
                                }`
                            }
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                                }`} />
                            <span className="text-sm">{item.label}</span>
                            {location.pathname === item.path && (
                                <motion.div
                                    layoutId="sidebar-indicator"
                                    className="ml-auto w-1.5 h-8 bg-blue-600 rounded-full"
                                    transition={{ type: 'spring', duration: 0.5 }}
                                />
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Quick Action */}
                <div className="mt-4 p-4 rounded-xl bg-linear-to-br from-blue-600/5 to-blue-500/5 border border-blue-600/10">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-blue-600/10">
                            <FiPlusCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Quick Action</p>
                            <p className="text-xs text-gray-700/60">Start a new form</p>
                        </div>
                        <NavLink
                            to="/ai-input"
                            className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Go
                        </NavLink>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                    {bottomItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-blue-600/10 text-blue-600 font-medium'
                                    : 'text-gray-700/60 hover:text-gray-900 hover:bg-gray-50'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm">{item.label}</span>
                        </NavLink>
                    ))}

                    {/* Logout button */}
                    <button
                        onClick={() => {
                            // Handle logout
                            window.location.href = '/';
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
                    >
                        <FiLogOut className="w-5 h-5" />
                        <span className="text-sm">Logout</span>
                    </button>
                </div>

                {/* Version */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">Forma AI v1.0.0</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;