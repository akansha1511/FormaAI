import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './context/AuthContext';
import { FormProvider } from './context/FormContext';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AI_Input from './pages/AI_Input';
import Analytics from './pages/Analytics';
import Review from './pages/Review';
import Dynamic_Form from './pages/Dynamic_Form';
import Success from './pages/Success';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Forms from './pages/Forms';
import FormDetails from './pages/FormDetails';
import IncidentDetail from './pages/IncidentDetail';
import NotFound from './pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <FormProvider>
                    <AnimatePresence mode="wait">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Landing />} />
                            <Route element={<AuthLayout />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Route>

                            {/* Protected Routes */}
                            <Route element={<MainLayout />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/ai-input" element={<AI_Input />} />
                                <Route path="/review" element={<Review />} />
                                <Route path="/form" element={<Dynamic_Form />} />
                                <Route path="/form/:id" element={<FormDetails />} />
                                <Route path="/analytics" element={<Analytics />} />
                                <Route path="/success" element={<Success />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/forms" element={<Forms />} />
                                <Route path="/incident/:id" element={<IncidentDetail />} />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </AnimatePresence>
                    <ToastContainer position="top-right" autoClose={3000} />
                </FormProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
