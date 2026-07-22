import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const mainLayout = () => {
    const { loading } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [location, isMobile]);

    // Toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Page transition variants
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 20,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    };

    // Show loader while auth is checking
    if (loading) {
        return <Loader fullScreen text="Loading..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50/95">
            {/* Navbar */}
            <Navbar onMenuClick={toggleSidebar} />

            {/* Main Content Area */}
            <div className="flex pt-16">
                {/* Sidebar */}
                <AnimatePresence mode="wait">
                    {isSidebarOpen && (
                        <motion.aside
                            initial={{ x: isMobile ? -280 : 0, opacity: isMobile ? 0 : 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -280, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className={`fixed left-0 top-16 bottom-0 z-40 w-70 bg-white/90 backdrop-blur-lg border-r border-gray-100/50 overflow-y-auto ${isMobile ? 'shadow-2xl' : ''
                                }`}
                        >
                            <Sidebar />
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Overlay for mobile */}
                {isMobile && isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
                    />
                )}

                {/* Main Content */}
                <motion.main
                    className={`flex-1 min-h-[calc(100vh-4rem)] p-4 md:p-6 lg:p-8 transition-all duration-300 ${isSidebarOpen && !isMobile ? 'ml-70' : 'ml-0'
                        }`}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="max-w-7xl mx-auto"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </motion.main>
            </div>
        </div>
    );
};

export default mainLayout;
