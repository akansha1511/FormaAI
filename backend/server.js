const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// Load environment variables
dotenv.config();

// Import database
const connectDB = require('./config/database');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { generalLimiter, authLimiter } = require('./middleware/rateLimiter');

// Import routes
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const formRoutes = require('./routes/formRoutes');
const responseRoutes = require('./routes/responseRoutes');
const templateRoutes = require('./routes/templateRoutes');

// Initialize express
const app = express();

// ============ MIDDLEWARE ============

// Security headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'X-Total-Count']
}));

// Compression
app.use(compression());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate limiting
app.use('/api', generalLimiter);
app.use('/api/auth', authLimiter);

// ============ ROUTES ============

// Health check - shows current connection status
app.get('/health', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.status(200).json({
        success: true,
        status: 'OK',
        message: 'Forma AI Backend is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        mongodb: isConnected ? 'Connected' : 'Disconnected',
        readyState: mongoose.connection.readyState,
        database: mongoose.connection.name || 'N/A'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.json({
        name: 'Forma AI Backend API',
        version: '1.0.0',
        status: 'running',
        database: isConnected ? '✅ Connected' : '❌ Disconnected',
        endpoints: {
            auth: '/api/auth',
            ai: '/api/ai',
            forms: '/api/forms',
            responses: '/api/responses',
            templates: '/api/templates'
        }
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/templates', templateRoutes);

// ============ ERROR HANDLING ============

// 404 Not Found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
});

// Global error handler
app.use(errorHandler);

// ============ START SERVER ============

const PORT = process.env.PORT || 5000;

//  Connect to MongoDB first, then start server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        
        // Start server
        const server = app.listen(PORT, () => {
            const isConnected = mongoose.connection.readyState === 1;
            console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   🚀 Forma AI Backend Server Started                                      ║
║                                                                           ║
║   📡 Port:          ${PORT}                                                  ║
║   🌍 Environment:   ${process.env.NODE_ENV || 'development'}                                           ║
║   📍 API URL:       http://localhost:${PORT}/api                             ║
║   📊 Database:      ${isConnected ? '✅ Connected' : '❌ Disconnected'}                                          ║
║   📁 Database Name: ${mongoose.connection.name || 'N/A'}                                              ║
║   🔗 Client:        ${process.env.CLIENT_URL || 'http://localhost:5173'}                                 ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
            `);
        });

        // ============ GRACEFUL SHUTDOWN ============

        process.on('unhandledRejection', (err) => {
            console.error('❌ Unhandled Rejection:', err.message);
            server.close(() => process.exit(1));
        });

        process.on('uncaughtException', (err) => {
            console.error('❌ Uncaught Exception:', err.message);
            server.close(() => process.exit(1));
        });

        process.on('SIGTERM', () => {
            console.log('👋 SIGTERM received. Shutting down...');
            server.close(() => {
                mongoose.connection.close(false, () => {
                    console.log('✅ MongoDB connection closed');
                    process.exit(0);
                });
            });
        });

        process.on('SIGINT', () => {
            console.log('👋 SIGINT received. Shutting down...');
            server.close(() => {
                mongoose.connection.close(false, () => {
                    console.log('✅ MongoDB connection closed');
                    process.exit(0);
                });
            });
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

// Call the start function
startServer();

module.exports = app;
