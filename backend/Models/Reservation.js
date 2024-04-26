const mongoose = require('mongoose');

const { ObjectId } = require('mongodb');

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
    

  stand:{type: ObjectId, ref: 'stand', required: true }, 
 
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
