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
    phone : {
        type: Number,
        required: true

    }  ,
    password : {
        type: String,
        required: true

    },
    role: { type: String, enum: ['admin', 'client'] }
});


// Modèle pour les utilisateurs basé sur le schéma
const User = mongoose.model('User', userSchema);
module.exports = User;
