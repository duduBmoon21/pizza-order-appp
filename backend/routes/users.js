const router = require("express").Router();
const { User } = require("../models/User"); 
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const Joi = require('joi'); // Ensure you import Joi

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, 
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use true for port 465
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: `"Eleanor Web" <${process.env.EMAIL_USERNAME}>`,
        to,
        subject,
        text,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Test Route for Sending Email
router.get('/test-email', async (req, res) => {
    try {
        await sendEmail(
            'eleanortefera12@gmail.com',
            'Test Email Subject',
            'This is a test email sent from Node.js using Nodemailer.',
            '<b>This is a test email sent from Node.js using Nodemailer.</b>'
        );
        res.send('Test email sent successfully!');
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

// Registration route
router.post('/register', async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    // Validate input using Joi
    const { error } = validateRegistration(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, username, email, password: hashedPassword });
        await newUser.save();

        await sendEmail(email, 'Registration Successful', 'Welcome! You have successfully registered.');

        res.status(201).json({ message: 'Registration successful! Please check your email.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Registration validation schema
const validateRegistration = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        username: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(6).required().label("Password"), // Example: Minimum password length
    });
    return schema.validate(data);
};


// Export the router
module.exports = router;
