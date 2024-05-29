const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },
  description: { type: String, required: true },
  image: { type: String },
  etat: { type: String, enum: ['en cours', 'terminé'], default: 'en cours' } // Ajout du champ etat
});

module.exports = mongoose.model('Event', eventSchema);
