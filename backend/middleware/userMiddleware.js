const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (request, response, next) => {
    let token;

    // Check for the token in the authorization header
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (e.g., "Bearer <token>")
            token = request.headers.authorization.split(' ')[1];

            // Verify token using the secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token's ID and attach it to the request object
            // Exclude the password field from being attached
            request.user = await User.findById(decoded.id).select('-password');

            // Proceed to the next middleware or the route handler
            next();
        } catch (error) {
            console.error(error);
            response.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        response.status(401).json({ error: 'Not authorized, no token' });
    }
};

module.exports = { protect };