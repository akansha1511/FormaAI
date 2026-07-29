export * from './api';
export * from './authService';
export * from './incidentService';
export * from './formService';
export * from './aiService';
export * from './uploadService';

// Default export for convenience
import * as api from './api';
import * as authService from './authService';
import * as incidentService from './incidentService';
import * as formService from './formService';
import * as aiService from './aiService';
import * as uploadService from './uploadService';

export default {
    api,
    authService,
    incidentService,
    formService,
    aiService,
    uploadService
};
