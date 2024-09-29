const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email regex
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

const User = mongoose.model("User", userSchema);

// Joi validation schema
const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        username: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};



// Validation schema for login
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};
module.exports = { User, validate ,validateLogin};
