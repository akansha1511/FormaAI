import api from './api';

export const authService = {
    /**
     * Register a new user
     * @param {Object} userData - { name, email, password }
     * @returns {Promise} - { success, token, user }
     */
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Registration failed' };
        }
    },

    /**
     * Login user
     * @param {Object} credentials - { email, password }
     * @returns {Promise} - { success, token, user }
     */
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Login failed' };
        }
    },

    /**
     * Get current user profile
     * @returns {Promise} - { success, user }
     */
    getMe: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to get user' };
        }
    },

    /**
     * Update user profile
     * @param {Object} profileData - { name, phone, location, bio, etc. }
     * @returns {Promise} - { success, profile, name }
     */
    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/auth/profile', { profile: profileData });
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Profile update failed' };
        }
    },

    /**
     * Update user settings
     * @param {Object} settings - { notifications, privacy, security, preferences }
     * @returns {Promise} - { success, settings }
     */
    updateSettings: async (settings) => {
        try {
            const response = await api.put('/auth/settings', { settings });
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Settings update failed' };
        }
    },

    /**
     * Change password
     * @param {Object} passwordData - { currentPassword, newPassword }
     * @returns {Promise} - { success, message }
     */
    changePassword: async (passwordData) => {
        try {
            const response = await api.put('/auth/change-password', passwordData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Password change failed' };
        }
    },

    /**
     * Request password reset email
     * @param {string} email - User's email address
     * @returns {Promise} - { success, message }
     */
    requestPasswordReset: async (email) => {
        try {
            const response = await api.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Password reset request failed' };
        }
    },

    /**
     * Reset password with token
     * @param {string} token - Reset token from email
     * @param {string} password - New password
     * @returns {Promise} - { success, message }
     */
    resetPassword: async (token, password) => {
        try {
            const response = await api.post(`/auth/reset-password/${token}`, { password });
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Password reset failed' };
        }
    },

    /**
     * Logout user (client-side)
     * @returns {Promise} - { success, message }
     */
    logout: async () => {
        try {
            // Optional: Call logout endpoint if backend supports it
            // const response = await api.post('/auth/logout');
            // return response.data;
            
            // Client-side logout
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return { success: true, message: 'Logged out successfully' };
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Logout failed' };
        }
    }
};
