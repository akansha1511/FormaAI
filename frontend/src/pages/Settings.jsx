import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUser, FiBell, FiLock, FiGlobe, FiMoon, FiSave, FiAlertCircle } from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { user } = useAuth();
    const [settings, setSettings] = useState({
        notifications: true,
        emailUpdates: true,
        twoFactor: false,
        language: 'English',
    });

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your preferences</p>
                </div>
            </div>

            {/* Profile Settings */}
            <Card>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiUser className="w-5 h-5 text-blue-600" />
                    Profile
                </h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                        <input
                            type="text"
                            value={user?.name || ''}
                            className="input-field"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            className="input-field"
                            disabled
                        />
                    </div>
                </div>
            </Card>

            {/* Preferences */}
            <Card>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiBell className="w-5 h-5 text-blue-600" />
                    Notifications
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                            <p className="text-xs text-gray-400">Receive updates about your forms</p>
                        </div>
                        <button
                            onClick={() => handleToggle('notifications')}
                            className={`w-12 h-6 rounded-full transition-colors ${settings.notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-700">Email Updates</p>
                            <p className="text-xs text-gray-400">Get weekly summary emails</p>
                        </div>
                        <button
                            onClick={() => handleToggle('emailUpdates')}
                            className={`w-12 h-6 rounded-full transition-colors ${settings.emailUpdates ? 'bg-blue-600' : 'bg-gray-300'}`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.emailUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </Card>

            {/* Security */}
            <Card>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiLock className="w-5 h-5 text-blue-600" />
                    Security
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                            <p className="text-xs text-gray-400">Add an extra layer of security</p>
                        </div>
                        <button
                            onClick={() => handleToggle('twoFactor')}
                            className={`w-12 h-6 rounded-full transition-colors ${settings.twoFactor ? 'bg-blue-600' : 'bg-gray-300'}`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">Change Password</button>
                </div>
            </Card>

            {/* Language */}
            <Card>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiGlobe className="w-5 h-5 text-blue-600" />
                    Language
                </h3>
                <select className="input-field w-full">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                    <option>French</option>
                </select>
            </Card>

            {/* Save */}
            <Button variant="primary" className="w-full" onClick={() => alert('Settings saved successfully!')}>
                <FiSave className="mr-2" />
                Save Settings
            </Button>
        </div>
    );
};

export default Settings;
