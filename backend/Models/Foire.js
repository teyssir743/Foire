const mongoose = require('mongoose');

const foireSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organisateur: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        enum: ['en attente', 'en cours', 'terminée'],
        default: 'en attente'
    }
});

const Foire = mongoose.model('Foire', foireSchema);

module.exports = Foire;
