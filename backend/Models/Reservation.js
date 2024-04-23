const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    stand: {
        type: String,
       required: true,
    },
    event: {
        type: String,
        required: true,
    },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
