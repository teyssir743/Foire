const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  stand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stand', // Assurez-vous que cela correspond à votre modèle de stand
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Assurez-vous que cela correspond à votre modèle d'événement
    required: true
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
