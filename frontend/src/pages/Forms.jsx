import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFileText, FiArrowLeft, FiSearch, FiFilter } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';

const Forms = () => {
    const { user } = useAuth();
    const [forms, setForms] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const allForms = JSON.parse(localStorage.getItem('allForms') || '[]');
        const userForms = allForms.filter(f => f.userId === user?.id || !f.userId);
        setForms(userForms);
    }, [user]);

    const filteredForms = forms.filter(f =>
        f.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Forms</h1>
                    <p className="text-sm text-gray-500 mt-1">{forms.length} forms total</p>
                </div>
            </div>

            {/* Search */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search forms..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                    />
                </div>
                <Button variant="outline" size="sm">
                    <FiFilter className="mr-2" />
                    Filter
                </Button>
            </div>

            {/* Form List */}
            {filteredForms.length === 0 ? (
                <div className="text-center py-12">
                    <FiFileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                        {search ? 'No forms match your search' : 'No forms created yet'}
                    </p>
                    {!search && (
                        <Link to="/ai-input" className="mt-3 inline-block">
                            <Button variant="primary" size="sm">Create First Form</Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredForms.map((form) => (
                        <motion.div
                            key={form.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-blue-600/10">
                                    <FiFileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{form.title}</p>
                                    <p className="text-xs text-gray-400">{form.date}</p>
                                </div>
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
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Forms;
