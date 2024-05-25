const mongoose = require('mongoose');

const standSchema = new mongoose.Schema({
  num: {
    type: Number,
    required: true,
    unique: true
  },
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
  etat: {
    type: String,
    required: true,
    enum: ['disponible', 'occupé']
  },
  prixLocation: {
    type: Number,
    required: true
  }
});

const Stand = mongoose.model('Stand', standSchema);

module.exports = Stand;
