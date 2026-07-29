import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AI_Input from './pages/AI_Input';
import Dynamic_Form from './pages/Dynamic_Form';
import Review from './pages/Review';
import Success from './pages/Success';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Forms from './pages/Forms';
import FormDetails from './pages/FormDetails';
import IncidentDetail from './pages/IncidentDetail'; // ✅ ADD THIS
import NotFound from './pages/NotFound'; // ✅ ADD THIS

// Context
import { AuthProvider } from './context/AuthContext';
import { FormProvider } from './context/FormContext';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <FormProvider>
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route element={<AuthLayout />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Route>
                            <Route element={<MainLayout />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/ai-input" element={<AI_Input />} />
                                <Route path="/form" element={<Dynamic_Form />} />
                                <Route path="/form/:id" element={<FormDetails />} />
                                <Route path="/review" element={<Review />} />
                                <Route path="/success" element={<Success />} />
                                <Route path="/analytics" element={<Analytics />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/forms" element={<Forms />} />
                                <Route path="/incident/:id" element={<IncidentDetail />} /> {/* ✅ ADD THIS */}
                            </Route>
                            {/* ✅ REPLACE this with NotFound */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </AnimatePresence>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </FormProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
