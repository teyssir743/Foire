const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    civility: {
        type: String,
        enum: ['M.', 'Mme', 'Mlle'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    matricule: {
        type: String,
        required: true,
        unique: true
    },
    nationality: {
        type: String,
        required: true
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
