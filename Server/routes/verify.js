const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Middleware to verify email via OTP
const verifyEmailOTP = async (req, res, next) => {
    const { email, otp } = req.body;

    // Assuming you have a function to get the stored OTP for the email
    const storedOTP = await getStoredOTP(email);

    if (storedOTP === otp) {
        next();
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
};

// Function to get stored OTP (this should be implemented according to your storage mechanism)
const getStoredOTP = async (email) => {
    // Example: Fetch OTP from database or cache
    // return await database.getOTP(email);
    return '123456'; // Placeholder
};

// Route to send OTP to email
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to storage (database, cache, etc.)
    // await saveOTP(email, otp);

    // Send OTP via email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending OTP' });
        }
        res.status(200).json({ message: 'OTP sent successfully' });
    });
});

// Example protected route
router.post('/verify', verifyEmailOTP, (req, res) => {
    res.status(200).json({ message: 'Email verified successfully' });
});

module.exports = router;