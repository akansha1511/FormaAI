import api from './api';

export const aiService = {
    extract: async (description) => {
        try {
            const response = await api.post('/ai/extract', { description });
            return response.data;
        } catch (error) {
            console.error('AI Extraction Error:', error);
            throw error.response?.data || { success: false, message: 'AI extraction failed' };
        }
    },

    generate: async (prompt) => {
        try {
            const response = await api.post('/ai/generate', { prompt });
            return response.data;
        } catch (error) {
            console.error('AI Generation Error:', error);
            throw error.response?.data || { success: false, message: 'AI generation failed' };
        }
    },

    analyze: async (incidentData) => {
        try {
            const response = await api.post('/ai/analyze', { incident_data: incidentData });
            return response.data;
        } catch (error) {
            console.error('AI Analysis Error:', error);
            throw error.response?.data || { success: false, message: 'AI analysis failed' };
        }
    }
};
