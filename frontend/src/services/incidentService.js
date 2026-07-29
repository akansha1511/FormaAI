import api from './api';

export const incidentService = {
    /**
     * Create a new incident
     * @param {Object} data - Incident data
     * @returns {Promise} - { success, data }
     */
    create: async (data) => {
        try {
            const response = await api.post('/incidents', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to create incident' };
        }
    },

    /**
     * Get all incidents with filters
     * @param {Object} params - { status, severity, type, search, page, limit }
     * @returns {Promise} - { success, data, pagination }
     */
    getAll: async (params = {}) => {
        try {
            const response = await api.get('/incidents', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to load incidents' };
        }
    },

    /**
     * Get single incident by ID
     * @param {string} id - Incident ID
     * @returns {Promise} - { success, data }
     */
    getOne: async (id) => {
        try {
            const response = await api.get(`/incidents/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Incident not found' };
        }
    },

    /**
     * Update incident
     * @param {string} id - Incident ID
     * @param {Object} data - Updated incident data
     * @returns {Promise} - { success, data }
     */
    update: async (id, data) => {
        try {
            const response = await api.put(`/incidents/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to update incident' };
        }
    },

    /**
     * Delete incident
     * @param {string} id - Incident ID
     * @returns {Promise} - { success, message }
     */
    delete: async (id) => {
        try {
            const response = await api.delete(`/incidents/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to delete incident' };
        }
    },

    /**
     * AI Extraction from description
     * @param {string} description - Incident description text
     * @returns {Promise} - { success, data }
     */
    extract: async (description) => {
        try {
            const response = await api.post('/incidents/extract', { description });
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'AI extraction failed' };
        }
    },

    /**
     * Add comment to incident
     * @param {string} id - Incident ID
     * @param {string} text - Comment text
     * @returns {Promise} - { success, data }
     */
    addComment: async (id, text) => {
        try {
            const response = await api.post(`/incidents/${id}/comments`, { text });
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to add comment' };
        }
    },

    /**
     * Get incident statistics
     * @returns {Promise} - { success, data }
     */
    getStats: async () => {
        try {
            const response = await api.get('/incidents/stats');
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to get statistics' };
        }
    },

    /**
     * Upload attachment to incident
     * @param {string} id - Incident ID
     * @param {File} file - File to upload
     * @returns {Promise} - { success, data }
     */
    uploadAttachment: async (id, file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await api.post(`/incidents/${id}/attachments`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to upload attachment' };
        }
    }
};
