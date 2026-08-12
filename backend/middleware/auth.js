const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const protect = async (req, res, next) => {
    let token;
    
    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        console.log('🔑 Token received:', token ? '✅ Yes' : '❌ No');
    }
    
    if (!token) {
        console.log('❌ No token found');
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token verified for user ID:', decoded.id);
        
        //  IMPORTANT: Fetch user from database
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            console.log('❌ User not found in database');
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }
        
        //  Attach full user object to request
        req.user = user;
        console.log('✅ User attached:', user.email);
        next();
    } catch (error) {
        console.error('❌ Auth error:', error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Not authorized'
        });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized`
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
