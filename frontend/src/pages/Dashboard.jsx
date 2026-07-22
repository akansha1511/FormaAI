import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiFileText,
    FiPlus,
    FiClock,
    FiCheckCircle,
    FiAlertCircle,
    FiArrowRight,
    FiTrendingUp,
    FiUsers,
    FiCalendar,
    FiSearch,
    FiFilter
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../context/FormContext';
import Button from '../components/Button';
import Card from '../components/Card';

const Dashboard = () => {
    const { user } = useAuth();
    const { formData, loadDraft } = useForm();
    const [recentForms, setRecentForms] = useState([]);
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        // Mock data - Replace with API calls
        setRecentForms([
            { id: 1, title: 'Insurance Claim - Auto', status: 'Completed', date: '2024-01-15', type: 'claim' },
            { id: 2, title: 'Incident Report - Office', status: 'In Progress', date: '2024-01-14', type: 'incident' },
            { id: 3, title: 'Accident Report - NH48', status: 'Review', date: '2024-01-13', type: 'accident' },
        ]);

        // Check for saved drafts
        const savedDraft = localStorage.getItem('formDraft');
        if (savedDraft) {
            setDrafts([{ id: 1, title: 'Draft - Insurance Claim', date: '2024-01-15' }]);
        }
    }, []);

    const stats = [
        { label: 'Total Forms', value: '24', icon: FiFileText, color: 'from-blue-500 to-cyan-400' },
        { label: 'Completed', value: '18', icon: FiCheckCircle, color: 'from-emerald-500 to-teal-400' },
        { label: 'In Progress', value: '4', icon: FiClock, color: 'from-amber-500 to-orange-400' },
        { label: 'Drafts', value: '2', icon: FiAlertCircle, color: 'from-purple-500 to-pink-400' },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.name || 'Guest'}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your forms today.</p>
                </div>
                <Link to="/ai-input" className="mt-4 md:mt-0">
                    <Button variant="primary" className="shadow-lg shadow-blue-500/25">
                        <FiPlus className="mr-2" />
                        New Form
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <Card hoverable className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color} shadow-lg shadow-${stat.color.split('-')[1]}/20`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-8 bg-linear-to-br from-blue-600/5 to-cyan-500/5 border-blue-600/10">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                            <p className="text-sm text-gray-500 mt-1">Start a new form or continue where you left off</p>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <Link to="/ai-input">
                                    <Button variant="primary" size="sm">
                                        New Form
                                    </Button>
                                </Link>
                                {drafts.length > 0 && (
                                    <Button variant="outline" size="sm">
                                        Continue Draft
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="p-4 bg-linear-to-br from-blue-600 to-cyan-400 rounded-2xl shadow-xl shadow-blue-500/25">
                            <FiPlus className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </Card>

                <Card className="p-8 bg-linear-to-br from-purple-600/5 to-pink-500/5 border-purple-600/10">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
                            <p className="text-sm text-gray-500 mt-1">Let AI help you with your forms</p>
                            <Link to="/ai-input">
                                <Button variant="secondary" size="sm" className="mt-4">
                                    Try AI Assistant
                                    <FiArrowRight className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                        <div className="p-4 bg-linear-to-br from-purple-600 to-pink-400 rounded-2xl shadow-xl shadow-purple-500/25">
                            <FiTrendingUp className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Forms */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Forms</h2>
                    <Link to="/forms" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                        View All
                    </Link>
                </div>
                <div className="space-y-4">
                    {recentForms.map((form) => (
                        <motion.div
                            key={form.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card hoverable className="p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-xl bg-blue-600/10">
                                            <FiFileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{form.title}</p>
                                            <p className="text-sm text-gray-500">{form.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${form.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                form.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {form.status}
                                        </span>
                                        <Link to={`/form/${form.id}`}>
                                            <Button variant="ghost" size="sm">
                                                View
                                                <FiArrowRight className="ml-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;