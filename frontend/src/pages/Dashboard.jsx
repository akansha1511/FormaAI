// src/pages/Dashboard.jsx
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
    FiTrendingUp
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../context/FormContext';
import Button from '../components/Button';
import Card from '../components/Card';

const Dashboard = () => {
    const { user } = useAuth();
    const { getForms, getUserForms } = useForm();
    const [recentForms, setRecentForms] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        inProgress: 0,
        drafts: 0
    });

    // ✅ Load forms on mount
    useEffect(() => {
        loadForms();
    }, []);

    const loadForms = () => {
        // Get all forms
        const allForms = JSON.parse(localStorage.getItem('allForms') || '[]');

        // Filter for current user
        const userForms = allForms.filter(f => f.userId === user?.id || !f.userId);

        // Update stats
        const completed = userForms.filter(f => f.status === 'Completed').length;
        const inProgress = userForms.filter(f => f.status === 'In Progress' || f.status === 'Review').length;
        const drafts = userForms.filter(f => f.status === 'Draft').length;

        setStats({
            total: userForms.length,
            completed: completed,
            inProgress: inProgress,
            drafts: drafts
        });

        // Get recent forms (last 5)
        const sorted = [...userForms].sort((a, b) => new Date(b.submittedAt || b.date) - new Date(a.submittedAt || a.date));
        setRecentForms(sorted.slice(0, 5));
    };

    // Stats cards
    const statCards = [
        { label: 'Total Forms', value: stats.total, icon: FiFileText, color: 'from-blue-500 to-cyan-400' },
        { label: 'Completed', value: stats.completed, icon: FiCheckCircle, color: 'from-emerald-500 to-teal-400' },
        { label: 'In Progress', value: stats.inProgress, icon: FiClock, color: 'from-amber-500 to-orange-400' },
        { label: 'Drafts', value: stats.drafts, icon: FiAlertCircle, color: 'from-purple-500 to-pink-400' },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.name || 'Guest'}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {stats.total === 0 ? 'Start creating your first form today!' : `You have ${stats.total} forms processed.`}
                    </p>
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
                {statCards.map((stat, index) => (
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

            {/* ✅ Recent Forms - Now Shows Real Data */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Forms</h2>
                    <Link to="/forms" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                        View All ({stats.total})
                    </Link>
                </div>

                {recentForms.length === 0 ? (
                    <Card className="p-8 text-center border-2 border-dashed border-gray-200">
                        <div className="flex flex-col items-center justify-center">
                            <div className="p-4 rounded-full bg-blue-50 mb-4">
                                <FiFileText className="w-10 h-10 text-blue-300" />
                            </div>
                            <h3 className="text-base font-medium text-gray-900 mb-1">No forms yet</h3>
                            <p className="text-sm text-gray-500">Create your first form using AI</p>
                            <Link to="/ai-input" className="mt-4">
                                <Button variant="primary" size="sm">
                                    <FiPlus className="mr-2" />
                                    Create Form
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {recentForms.map((form) => (
                            <motion.div
                                key={form.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card hoverable className="p-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-2.5 rounded-xl bg-blue-600/10">
                                                <FiFileText className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{form.title}</p>
                                                <p className="text-xs text-gray-400">{form.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${form.status === 'Completed' ? 'bg-green-100 text-green-700' :
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
                )}
            </div>
        </div>
    );
};

export default Dashboard;
