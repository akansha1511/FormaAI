import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // ✅ Load user on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, []);

    // ✅ Load user from backend
    const loadUser = async () => {
        try {
            const response = await authService.getMe();
            setUser(response.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error loading user:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                setUser(null);
                setIsAuthenticated(false);
            }
        } finally {
            setLoading(false);
        }
    };

    // ✅ Login - Save tokens
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await authService.login({ email, password });
            const { token, refreshToken, user } = response;
            
            // ✅ Save tokens
            localStorage.setItem('token', token);
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            localStorage.setItem('user', JSON.stringify(user));
            
            setUser(user);
            setIsAuthenticated(true);
            toast.success('Welcome back! 🎉');
            return { success: true, user };
        } catch (error) {
            toast.error(error.message || 'Login failed');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // ✅ Register - Save tokens
    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const response = await authService.register({ name, email, password });
            const { token, refreshToken, user } = response;
            
            // ✅ Save tokens
            localStorage.setItem('token', token);
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            localStorage.setItem('user', JSON.stringify(user));
            
            setUser(user);
            setIsAuthenticated(true);
            toast.success('Account created successfully! 🎉');
            return { success: true, user };
        } catch (error) {
            toast.error(error.message || 'Registration failed');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // ✅ Logout - Clear all tokens
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        toast.info('Logged out successfully');
    };

    // ✅ Update Profile
    const updateProfile = async (profileData) => {
        try {
            const response = await authService.updateProfile(profileData);
            setUser(prev => ({ ...prev, ...response.profile }));
            toast.success('Profile updated successfully!');
            return { success: true };
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
            return { success: false };
        }
    };

    // ✅ Update Settings
    const updateSettings = async (settings) => {
        try {
            const response = await authService.updateSettings(settings);
            setUser(prev => ({ ...prev, settings: response.settings }));
            toast.success('Settings updated successfully!');
            return { success: true };
        } catch (error) {
            toast.error(error.message || 'Failed to update settings');
            return { success: false };
        }
    };

    // ✅ Check if token is expired
    const isTokenExpired = () => {
        const token = localStorage.getItem('token');
        if (!token) return true;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    };

    // ✅ Get token expiry time
    const getTokenExpiry = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return new Date(payload.exp * 1000);
        } catch {
            return null;
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        loadUser,
        updateProfile,
        updateSettings,
        isTokenExpired,
        getTokenExpiry,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
