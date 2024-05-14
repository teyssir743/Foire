const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
// Définition du schéma du stand
const standModel = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
    emplacement: {
        type: String,
        required: true
    },
    taille: {
        type: String,
        required: true
    },
   
    etat: {
        type: String,
        enum: ['réservé', 'disponible'],
        default: ''
    },
    prixLocation:{type: Number,} 
    
    

});

// Création du modèle Stand à partir du schéma
// Exportation du modèle Stand

module.exports = mongoose.model('stand', standModel);