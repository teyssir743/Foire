const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    invité: {
        type: String,
        required: true
    },
    événement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Événement',
        required: true
    },
    statut: {
        type: String,
        enum: ['en attente', 'acceptée', 'refusée'],
        default: 'en attente'
    },
    dateCréation: {
        type: Date,
        default: Date.now
    }
});

const Invitation = mongoose.model('Invitation', invitationSchema);
module.exports = Invitation;
