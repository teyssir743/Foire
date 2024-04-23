const express = require('express');
const router = express.Router();
const Reservation = require('../Models/Reservation');

// Route pour créer un nouveau Reservation



router.post('/createReservation', async (req, res) => {
  const reservation = new Reservation(req.body);
  try {
      const newReservation = await reservation.save();
      res.status(201).json(newReservation);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// Route pour obtenir toutes les réservations
router.get('/listeReservation', async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        res.json({ data: reservations });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour rechercher une réservation par ID
router.get('/listeReservation/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (reservation) {
            res.json({ data: reservation });
        } else {
            res.status(404).json({ error: 'Réservation non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour rechercher des réservations par nom
router.get('/listeReservation/name/:name', async (req, res) => {
    try {
        const reservations = await Reservation.find({ name: req.params.name });
        if (reservations.length > 0) {
            res.json({ data: reservations });
        } else {
            res.status(404).json({ error: 'Aucune réservation trouvée pour ce nom' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour mettre à jour une réservation par ID
router.put('/updateReservation/:id', async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Renvoie la réservation mise à jour
            runValidators: true // Exécute les validateurs de schéma
        });
        if (updatedReservation) {
            res.json({ msg: 'Réservation mise à jour avec succès !', data: updatedReservation });
        } else {
            res.status(404).json({ error: 'Réservation non trouvée' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer une réservation par ID
router.delete('/deleteReservation/:id', async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (deletedReservation) {
            res.json({ msg: 'Réservation supprimée avec succès' });
        } else {
            res.status(404).json({ error: 'Réservation non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
