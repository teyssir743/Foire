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
    role: { 
        type: String, 
        enum: ['admin', 'exposant'], 
        default: 'exposant' // Valeur par défaut est 'exposant'
    },
    password : {
        type: String,
        required: true

    },
   
    role: { type: String, enum: ['admin', 'client'] },
    
    
    // lorsque on fait un compte om met une valeur par defaut false et envoi un code de verification par email
    
     isActive:{
        type:Boolean,
        default:false,
    },

    activationCode:{type: String} 


});


// Modèle pour les utilisateurs basé sur le schéma
const User = mongoose.model('User', userSchema);
module.exports = User;
