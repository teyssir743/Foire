const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const paymentSchema = new mongoose.Schema({

    cardNumber: {
        type: String,
        required: true
    },
    expirationDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    selectedCard: {
        type: String,
        enum: ['visa', 'mastercard', 'paypal', 'amex'],
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    paymentDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
   
});


paymentSchema.pre('save', async function (next) {
    try {
        // Générer un sel pour le hachage
        const salt = await bcrypt.genSalt(10);
        // Hasher le cvv
        const hashedCvv = await bcrypt.hash(this.cvv, salt);
        // Remplacer la valeur du cvv par le hash
        this.cvv = hashedCvv;
        next();
    } catch (error) {
        next(error);
    }
});



const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
