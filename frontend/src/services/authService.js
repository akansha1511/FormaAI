import api from './api';

export const authService = {
    register: async (userData) => {
        try {
            console.log('📝 Registering:', userData.email);
            const response = await api.post('/auth/register', userData);
            console.log('✅ Register response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Register error:', error.response?.data || error.message);
            throw error.response?.data || { success: false, message: 'Registration failed' };
        }
    },

    login: async (credentials) => {
        try {
            console.log('🔑 Login request:', { email: credentials.email });
            const response = await api.post('/auth/login', credentials);
            console.log('✅ Login response:', response.data);
            
            // ✅ Validate token exists
            if (!response.data.token) {
                console.error('❌ No token in response!');
                throw new Error('No token received from server');
            }
            
            return response.data;
        } catch (error) {
            console.error('❌ Login error:', error.response?.data || error.message);
            throw error.response?.data || { success: false, message: 'Login failed' };
        }
    },

    getMe: async () => {
        try {
            console.log('👤 Getting current user');
            const response = await api.get('/auth/me');
            console.log('✅ GetMe response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ GetMe error:', error.response?.data || error.message);
            throw error.response?.data || { success: false, message: 'Failed to get user' };
        }
    },

    updateProfile: async (profileData) => {
        try {
            console.log('📝 Updating profile');
            const response = await api.put('/auth/profile', { profile: profileData });
            console.log('✅ Profile update response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Update profile error:', error.response?.data || error.message);
            throw error.response?.data || { success: false, message: 'Profile update failed' };
        }
    },

    updateSettings: async (settings) => {
        try {
            console.log('⚙️ Updating settings');
            const response = await api.put('/auth/settings', { settings });
            console.log('✅ Settings update response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Update settings error:', error.response?.data || error.message);
            throw error.response?.data || { success: false, message: 'Settings update failed' };
        }
    },

    logout: async () => {
        try {
            console.log('🚪 Logging out');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return { success: true, message: 'Logged out successfully' };
        } catch (error) {
            console.error('❌ Logout error:', error);
            return { success: false, message: 'Logout failed' };
        }
    }
};
