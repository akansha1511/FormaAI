import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBarChart2, FiFileText, FiCheckCircle, FiClock, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';

const Analytics = () => {
    const { user } = useAuth();
    const [forms, setForms] = useState([]);
    const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, drafts: 0 });

    useEffect(() => {
        const allForms = JSON.parse(localStorage.getItem('allForms') || '[]');
        const userForms = allForms.filter(f => f.userId === user?.id || !f.userId);
        setForms(userForms);
        setStats({
            total: userForms.length,
            completed: userForms.filter(f => f.status === 'Completed').length,
            inProgress: userForms.filter(f => f.status === 'In Progress').length,
            drafts: userForms.filter(f => f.status === 'Draft').length,
        });
    }, [user]);

    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1">Track your form performance</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Forms', value: stats.total, icon: FiFileText, color: 'from-blue-500 to-cyan-400' },
                    { label: 'Completed', value: stats.completed, icon: FiCheckCircle, color: 'from-emerald-500 to-teal-400' },
                    { label: 'In Progress', value: stats.inProgress, icon: FiClock, color: 'from-amber-500 to-orange-400' },
                    { label: 'Drafts', value: stats.drafts, icon: FiAlertCircle, color: 'from-purple-500 to-pink-400' },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="card"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color}`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Completion Rate */}
            <div className="card">
                <h3 className="font-semibold text-gray-900 mb-2">Completion Rate</h3>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1000"
                                style={{ width: `${completionRate}%` }}
                            />
                        </div>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{completionRate}%</span>
                </div>
            </div>

            {/* Form List */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">All Forms</h2>
                {forms.length === 0 ? (
                    <div className="text-center py-8">
                        <FiBarChart2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No forms to analyze yet</p>
                        <Link to="/ai-input" className="mt-3 inline-block">
                            <Button variant="primary" size="sm">Create First Form</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {forms.map((form) => (
                            <div key={form.id} className="recent-item flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">{form.title}</p>
                                    <p className="text-xs text-gray-400">{form.date}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-medium ${form.status === 'Completed' ? 'status-completed' :
                                            form.status === 'In Progress' ? 'status-inprogress' :
                                                'status-draft'
                                        }`}>
                                        {form.status}
                                    </span>
                                    <Link to={`/form/${form.id}`} className="text-sm text-blue-600 hover:underline">
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Analytics;
