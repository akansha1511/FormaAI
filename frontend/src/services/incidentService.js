import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { sanitizeInput } from '../utils/validators';
import { formatErrorMessage } from '../utils/errorHandler';
import { buildQueryString } from '../utils/apiHelpers';

export const incidentService = {
    /**
     * Create incident
     */
    create: async (data) => {
        try {
            const sanitizedData = {
                ...data,
                description: sanitizeInput(data.description),
                location: {
                    ...data.location,
                    address: sanitizeInput(data.location?.address || '')
                }
            };
            
            const response = await api.post(API_ENDPOINTS.INCIDENTS.BASE, sanitizedData);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error, 'Failed to create incident'));
        }
    },

    /**
     * Get all incidents with filters
     */
    getAll: async (params = {}) => {
        try {
            const queryString = buildQueryString(params);
            const response = await api.get(`${API_ENDPOINTS.INCIDENTS.BASE}${queryString}`);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error, 'Failed to load incidents'));
        }
    },

    /**
     * Get single incident
     */
    getOne: async (id) => {
        try {
            if (!id) throw new Error('Incident ID is required');
            const response = await api.get(`${API_ENDPOINTS.INCIDENTS.BASE}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error, 'Incident not found'));
        }
    },

    /**
     * Update incident
     */
    update: async (id, data) => {
        try {
            const sanitizedData = {
                ...data,
                description: sanitizeInput(data.description)
            };
            const response = await api.put(`${API_ENDPOINTS.INCIDENTS.BASE}/${id}`, sanitizedData);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error, 'Failed to update incident'));
        }
    },

    /**
     * Delete incident
     */
    delete: async (id) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.INCIDENTS.BASE}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error, 'Failed to delete incident'));
        }
    },

    /**
     * AI Extraction
     */
    extract: async (description) => {
        try {
            const sanitizedDescription = sanitizeInput(description);
            if (!sanitizedDescription) {
                throw new Error('Description is required');
            }
            const response = await api.post(API_ENDPOINTS.INCIDENTS.EXTRACT, { 
                description: sanitizedDescription 
            });
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error, 'AI extraction failed'));
        }
    },

    /**
     * Add comment
     */
    addComment: async (id, text) => {
        try {
            const sanitizedText = sanitizeInput(text);
            if (!sanitizedText) throw new Error('Comment text is required');
            
            const response = await api.post(API_ENDPOINTS.INCIDENTS.COMMENTS(id), { 
                text: sanitizedText 
            });
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error, 'Failed to add comment'));
        }
    },

    /**
     * Get incident statistics
     */
    getStats: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.INCIDENTS.STATS);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error, 'Failed to get statistics'));
        }
    }
};
