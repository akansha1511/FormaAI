import api from './api';

export const formService = {
    /**
     * Create a new form
     * @param {Object} data - Form configuration
     * @returns {Promise} - { success, data }
     */
    create: async (data) => {
        try {
            const response = await api.post('/forms', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to create form' };
        }
    },

    /**
     * Get all forms
     * @param {Object} params - { status, search, page, limit }
     * @returns {Promise} - { success, data, pagination }
     */
    getAll: async (params = {}) => {
        try {
            const response = await api.get('/forms', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to load forms' };
        }
    },

    /**
     * Get single form by ID
     * @param {string} id - Form ID
     * @returns {Promise} - { success, data }
     */
    getOne: async (id) => {
        try {
            const response = await api.get(`/forms/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Form not found' };
        }
    },

    /**
     * Update form
     * @param {string} id - Form ID
     * @param {Object} data - Updated form data
     * @returns {Promise} - { success, data }
     */
    update: async (id, data) => {
        try {
            const response = await api.put(`/forms/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to update form' };
        }
    },

    /**
     * Delete form
     * @param {string} id - Form ID
     * @returns {Promise} - { success, message }
     */
    delete: async (id) => {
        try {
            const response = await api.delete(`/forms/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to delete form' };
        }
    },

    /**
     * Submit form response
     * @param {string} id - Form ID
     * @param {Object} data - Form submission data
     * @returns {Promise} - { success, data }
     */
    submit: async (id, data) => {
        try {
            const response = await api.post(`/forms/${id}/submit`, { data });
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to submit form' };
        }
    },

    /**
     * Get form submissions
     * @param {string} id - Form ID
     * @returns {Promise} - { success, data }
     */
    getSubmissions: async (id) => {
        try {
            const response = await api.get(`/forms/${id}/submissions`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to get submissions' };
        }
    },

    /**
     * Get form schema
     * @param {string} id - Form ID
     * @returns {Promise} - { success, data }
     */
    getSchema: async (id) => {
        try {
            const response = await api.get(`/forms/${id}/schema`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to get form schema' };
        }
    }
};
