import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUser, FiMail, FiCalendar, FiEdit, FiSave } from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                    <p className="text-sm text-gray-500 mt-1">Your personal information</p>
                </div>
            </div>

            {/* Profile Card */}
            <Card className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-linear-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white text-3xl font-bold mx-auto">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">{user?.name || 'Guest'}</h2>
                <p className="text-gray-500">{user?.email || 'guest@example.com'}</p>
                <p className="text-xs text-gray-400 mt-1">Member since 2024</p>
            </Card>

            {/* Details */}
            <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Personal Details</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FiUser className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-xs text-gray-400">Full Name</p>
                            <p className="text-sm font-medium text-gray-900">{user?.name || 'Guest'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FiMail className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-xs text-gray-400">Email Address</p>
                            <p className="text-sm font-medium text-gray-900">{user?.email || 'guest@example.com'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FiCalendar className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-xs text-gray-400">Member Since</p>
                            <p className="text-sm font-medium text-gray-900">January 2024</p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
                <Button variant="primary" className="flex-1" onClick={() => alert('Edit profile mode activated!')}>
                    <FiEdit className="mr-2" />
                    Edit Profile
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => alert('Profile saved!')}>
                    <FiSave className="mr-2" />
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default Profile;
