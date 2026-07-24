import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiFileText, FiCalendar, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';

const FormDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const allForms = JSON.parse(localStorage.getItem('allForms') || '[]');
        const found = allForms.find(f => f.id === parseInt(id));
        setForm(found || null);
        setLoading(false);
    }, [id]);

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    if (!form) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Form not found</h2>
                <Link to="/forms" className="mt-4 inline-block">
                    <Button variant="primary">Back to Forms</Button>
                </Link>
            </div>
        );
    }

    const getFieldIcon = (key) => {
        const icons = {
            fullName: FiUser,
            email: FiMail,
            phone: FiPhone,
            location: FiMapPin,
            date: FiCalendar,
        };
        return icons[key] || FiFileText;
    };

    const formatLabel = (key) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/forms" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{form.title}</h1>
                    <p className="text-sm text-gray-500 mt-1">Submitted on {form.date}</p>
                </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${form.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        form.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                    }`}>
                    {form.status}
                </span>
                <span className="text-sm text-gray-400">Reference: {form.reference || 'N/A'}</span>
            </div>

            {/* Form Data */}
            <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Form Details</h3>
                <div className="space-y-4">
                    {Object.entries(form.data || {}).map(([key, value]) => {
                        if (!value) return null;
                        const Icon = getFieldIcon(key);
                        return (
                            <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-400">{formatLabel(key)}</p>
                                    <p className="text-sm font-medium text-gray-900">{String(value)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Extracted Data */}
            {form.extractedData && (
                <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Extracted Information</h3>
                    <div className="space-y-4">
                        {Object.entries(form.extractedData).map(([key, value]) => {
                            if (!value || key === 'description') return null;
                            return (
                                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-500">{formatLabel(key)}</span>
                                    <span className="text-sm font-medium text-gray-900">{String(value)}</span>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            )}

            {/* Actions */}
            <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate('/forms')}>
                    Back to Forms
                </Button>
                <Button variant="primary" onClick={() => alert('Downloading PDF...')}>
                    Download PDF
                </Button>
            </div>
        </div>
    );
};

export default FormDetails;
