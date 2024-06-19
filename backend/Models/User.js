const mongoose = require('mongoose');

// Schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true

    },
    role: {
        type: String,
        enum: ['admin', 'exposant'],
        default: 'exposant' 
    },
   
    password: {
        type: String,
        required: true

    },
    role: { type: String, enum: ['exposant', 'admin'] },
    isActive: {
        type: Boolean,
        default: false,
    },

    activationCode: { type: String },
    resetPasswordCode: { type: String }


});


const User = mongoose.model('User', userSchema);
module.exports = User;
