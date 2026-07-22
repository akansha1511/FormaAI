import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiMenu,
    FiX,
    FiLogOut,
    FiUser,
    FiSettings,
    FiHome,
    FiFileText,
    FiPlus,
    FiChevronDown
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import Button from './Button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsProfileOpen(false);
    };

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: FiHome },
        { path: '/ai-input', label: 'New Form', icon: FiPlus },
        { path: '/form', label: 'Current Form', icon: FiFileText },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100/50'
            : 'bg-white/80 backdrop-blur-lg border-b border-gray-100/50'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                                                ? 'bg-blue-600/10 text-blue-600'
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                                }`}
                                        >
                                            <span className="flex items-center space-x-2">
                                                <link.icon className="w-4 h-4" />
                                                <span>{link.label}</span>
                                            </span>
                                        </Link>
                                    ))}
                                </div>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''
                                            }`} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <FiUser className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm text-gray-700">Profile</span>
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <FiSettings className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm text-gray-700">Settings</span>
                                                </Link>
                                                <div className="border-t border-gray-100 my-1"></div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center space-x-3 w-full px-4 py-2.5 hover:bg-red-50 transition-colors text-red-500"
                                                >
                                                    <FiLogOut className="w-4 h-4" />
                                                    <span className="text-sm">Logout</span>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                                    Login
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" size="sm">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-100/50 bg-white/95 backdrop-blur-lg"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {user ? (
                                <>
                                    <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === link.path
                                                ? 'bg-blue-600/10 text-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <link.icon className="w-5 h-5" />
                                            <span className="font-medium">{link.label}</span>
                                        </Link>
                                    ))}
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center space-x-3 w-full px-4 py-3 text-left text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <FiLogOut className="w-5 h-5" />
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="block px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block px-4 py-3 btn-primary text-center rounded-xl"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
