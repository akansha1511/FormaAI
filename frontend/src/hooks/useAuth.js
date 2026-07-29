import { useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken, removeToken] = useLocalStorage('token', null);

    useEffect(() => {
        if (token) {
            loadUser();
        } else {
            setLoading(false);
            setUser(null);
        }
    }, [token]);

    const loadUser = useCallback(async () => {
        try {
            setLoading(true);
            const response = await authAPI.getMe();
            setUser(response.data.user);
            setError(null);
        } catch (err) {
            console.error('Load user error:', err);
            setError(err.message);
            removeToken();
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [removeToken]);

    const login = useCallback(async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authAPI.login({ email, password });
            const { token: newToken, user: userData } = response.data;
            
            setToken(newToken);
            setUser(userData);
            return { success: true, user: userData };
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, [setToken]);

    const register = useCallback(async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authAPI.register(userData);
            const { token: newToken, user: newUser } = response.data;
            
            setToken(newToken);
            setUser(newUser);
            return { success: true, user: newUser };
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, [setToken]);

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
        setError(null);
    }, [removeToken]);

    const updateProfile = useCallback(async (profileData) => {
        try {
            setLoading(true);
            const response = await authAPI.updateProfile(profileData);
            setUser(prev => ({ ...prev, ...response.data.profile }));
            return { success: true, data: response.data };
        } catch (err) {
            const message = err.response?.data?.message || 'Update failed';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSettings = useCallback(async (settings) => {
        try {
            setLoading(true);
            const response = await authAPI.updateSettings(settings);
            setUser(prev => ({ ...prev, settings: response.data.settings }));
            return { success: true, data: response.data };
        } catch (err) {
            const message = err.response?.data?.message || 'Settings update failed';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        token,
        login,
        register,
        logout,
        loadUser,
        updateProfile,
        updateSettings
    };
};