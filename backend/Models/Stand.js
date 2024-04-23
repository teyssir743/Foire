const mongoose = require('mongoose');

// Définition du schéma du stand
const standModel = new mongoose.Schema({
    nom: {
        type: String,
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
    exposant: {
        type: String,
        required: true
    },
    description: String,
    etat: {
        type: String,
        enum: ['réservé', 'confirmé', 'installé', 'démonté'],
        default: 'réservé'
    },
    prixLocation: Number,
    service: String,
    dateReservation: {
        type: Date,
        default: Date.now
    },
    dateInstallation: Date,
    dateDemontage: Date,
    commentaires: String,
    image : String
});

// Création du modèle Stand à partir du schéma
// Exportation du modèle Stand

module.exports = mongoose.model('stand', standModel);