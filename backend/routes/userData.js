const express = require('express');
const {
    register,
    login,
    verifyLoginMfa,
    setupMfa,
    verifyMfaSetup,
    getCurrentUser,
} = require('../controllers/userController');

const { protect } = require('../middleware/userMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/login/mfa', verifyLoginMfa);

// Protected routes (require a valid JWT)
router.get('/user', protect, getCurrentUser)
router.post('/mfa/setup', protect, setupMfa);
router.post('/mfa/verify', protect, verifyMfaSetup);

module.exports = router;