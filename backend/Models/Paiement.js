const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum:['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
});

const Paiement = mongoose.model('Paiement', paiementSchema);
module.exports = Paiement;
