// Contains code interacting with MongoDB database

const User = require('../models/userModel');
const mongoose = require('mongoose'); // <-- Mongoose required here
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// register a new user
const register = async (request, response) => {
    const { email, password } = request.body;

    // Check for empty fields
    let emptyFields = [];
    if (!email) emptyFields.push('email');
    if (!password) emptyFields.push('password');
    if (emptyFields.length > 0) {
        return response.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return response.status(400).json({ error: 'User with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password: hashedPassword });
        response.status(201).json({ email: user.email, message: 'User registered successfully.' });
    } catch (error) {
        response.status(500).json({ error: 'Server error during registration.' });
    }
};

// login a user
const login = async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return response.status(401).json({ error: 'Invalid credentials.' });
        }

        // if MFA is enabled, signal to the frontend that verification is required
        if (user.mfaEnabled) {
            return response.status(200).json({ mfaRequired: true, userId: user.id });
        }

        // if MFA is not enabled, issue JWT immediately
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        response.status(200).json({ token });
    } catch (error) {
        response.status(500).json({ error: 'Server error during login.' });
    }
};

// get the current user
const getCurrentUser = async (request, response) => {
    // request.user is attached by the 'protect' middleware
    response.status(200).json(request.user);
};

// verify MFA token after login
const verifyLoginMfa = async (request, response) => {
    const { userId, token } = request.body;

    // Validate the userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(404).json({ error: 'Invalid user ID format.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ error: 'User not found.' });
        }

        const isVerified = speakeasy.totp.verify({
            secret: user.mfaSecret,
            encoding: 'base32',
            token,
        });

        if (isVerified) {
            const authToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return response.status(200).json({ token: authToken });
        }

        response.status(400).json({ error: 'Invalid MFA token.' });
    } catch (error) {
        response.status(500).json({ error: 'Server error during MFA verification.' });
    }
};

// generate MFA secret and QR code
const setupMfa = async (request, response) => {
    // Note: Assumes `request.user` is populated by an auth middleware
    try {
        const secret = speakeasy.generateSecret({ name: `MyApp (${request.user.email})` });
        await User.findByIdAndUpdate(request.user.id, { mfaSecret: secret.base32 });

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
                return response.status(500).json({ error: 'Error generating QR code.' });
            }
            response.status(200).json({ qrCode: data_url, secret: secret.base32 });
        });
    } catch (error) {
        response.status(500).json({ error: 'Server error during MFA setup.' });
    }
};

// verify the initial MFA setup token
const verifyMfaSetup = async (request, response) => {
    const { token } = request.body;
    // Note: Assumes `request.user` is populated by an auth middleware
    try {
        const user = await User.findById(request.user.id);
        const isVerified = speakeasy.totp.verify({
            secret: user.mfaSecret,
            encoding: 'base32',
            token,
        })

        if (isVerified) {
            await User.findByIdAndUpdate(request.user.id, { mfaEnabled: true });
            return response.status(200).json({ message: 'MFA has been successfully enabled.' })
        }

        response.status(400).json({ error: 'Invalid MFA token.' });
    } catch (error) {
        response.status(500).json({ error: 'Server error during MFA verification.' })
    }
};

const disableMfa = async (request, response) => {
    try {
        await User.findByIdAndUpdate(request.user.id, {
            mfaEnabled: false,
            mfaSecret: '', // Clear the secret for security
        });
        response.status(200).json({ message: 'MFA has been disabled.' })
    } catch (error) {
        response.status(500).json({ error: 'Server error while disabling MFA.' })
    }
};

const changePassword = async (request, response) => {
    const { currentPassword, newPassword } = request.body;
    
    // Basic validation
    if (!currentPassword || !newPassword) {
        return response.status(400).json({ error: 'Please fill in all fields.' })
    }

    if (newPassword.length < 6) {
        return response.status(400).json({ error: 'New password must be at least 6 characters long.' })
    }

    try {
        const user = await User.findById(request.user.id)
        if (!user) {
            return response.status(404).json({ error: 'User not found.' })
        }

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return response.status(400).json({ error: 'Incorrect current password.' })
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        response.status(200).json({ message: 'Password changed successfully.' })
    } catch (error) {
        response.status(500).json({ error: 'Server error while changing password.' })
    }
}

module.exports = {
    register,
    login,
    verifyLoginMfa,
    setupMfa,
    verifyMfaSetup,
    getCurrentUser,
    disableMfa,
    changePassword
};
