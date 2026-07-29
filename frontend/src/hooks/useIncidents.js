import { useState, useEffect, useCallback } from 'react';
import { incidentAPI } from '../services/api';
import { useAuth } from './useAuth';
import { useDebounce } from './useDebounce';

export const useIncidents = () => {
    const { user } = useAuth();
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedIncident, setSelectedIncident] = useState(null);
    
    const [filters, setFilters] = useState({
        status: '',
        severity: '',
        type: '',
        search: ''
    });
    
    const debouncedSearch = useDebounce(filters.search, 500);
    
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });

    // Load incidents
    const loadIncidents = useCallback(async () => {
        if (!user) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await incidentAPI.getAll({
                ...filters,
                search: debouncedSearch,
                page: pagination.page,
                limit: pagination.limit
            });
            
            setIncidents(response.data.data || []);
            setPagination(prev => ({
                ...prev,
                total: response.data.pagination?.total || 0,
                pages: response.data.pagination?.pages || 0
            }));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load incidents');
            setIncidents([]);
        } finally {
            setLoading(false);
        }
    }, [user, filters, debouncedSearch, pagination.page, pagination.limit]);

    // Auto-load on dependencies change
    useEffect(() => {
        loadIncidents();
    }, [loadIncidents]);

    // Create incident
    const createIncident = useCallback(async (data) => {
        try {
            setLoading(true);
            const response = await incidentAPI.create(data);
            setIncidents(prev => [response.data.data, ...prev]);
            return { success: true, data: response.data.data };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to create incident';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    // Update incident
    const updateIncident = useCallback(async (id, data) => {
        try {
            setLoading(true);
            const response = await incidentAPI.update(id, data);
            setIncidents(prev => prev.map(inc => 
                inc._id === id ? response.data.data : inc
            ));
            if (selectedIncident?._id === id) {
                setSelectedIncident(response.data.data);
            }
            return { success: true, data: response.data.data };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to update incident';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, [selectedIncident]);

    // Delete incident
    const deleteIncident = useCallback(async (id) => {
        try {
            setLoading(true);
            await incidentAPI.delete(id);
            setIncidents(prev => prev.filter(inc => inc._id !== id));
            if (selectedIncident?._id === id) {
                setSelectedIncident(null);
            }
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to delete incident';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, [selectedIncident]);

    // Get single incident
    const getIncident = useCallback(async (id) => {
        try {
            setLoading(true);
            const response = await incidentAPI.getOne(id);
            setSelectedIncident(response.data.data);
            return { success: true, data: response.data.data };
        } catch (err) {
            const message = err.response?.data?.message || 'Incident not found';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    // Update filters
    const updateFilters = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPagination(prev => ({ ...prev, page: 1 }));
    }, []);

    // Change page
    const goToPage = useCallback((page) => {
        setPagination(prev => ({ ...prev, page }));
    }, []);

    // Clear filters
    const clearFilters = useCallback(() => {
        setFilters({
            status: '',
            severity: '',
            type: '',
            search: ''
        });
        setPagination(prev => ({ ...prev, page: 1 }));
    }, []);

    // Get statistics
    const getStats = useCallback(() => {
        const total = incidents.length;
        const pending = incidents.filter(i => i.status === 'Reported' || i.status === 'Under Review').length;
        const inProgress = incidents.filter(i => i.status === 'In Progress').length;
        const resolved = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
        const critical = incidents.filter(i => i.severity === 'Critical').length;
        
        return {
            total,
            pending,
            inProgress,
            resolved,
            critical,
            resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0
        };
    }, [incidents]);

    // AI Extraction
    const extractWithAI = useCallback(async (description) => {
        try {
            setLoading(true);
            const response = await incidentAPI.extract(description);
            return { success: true, data: response.data.data };
        } catch (err) {
            const message = err.response?.data?.message || 'AI extraction failed';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        incidents,
        loading,
        error,
        selectedIncident,
        filters,
        pagination,
        loadIncidents,
        createIncident,
        updateIncident,
        deleteIncident,
        getIncident,
        updateFilters,
        goToPage,
        clearFilters,
        getStats,
        extractWithAI
    };
};