const express = require('express');
const router = express.Router();
const Reservation = require('../Models/Reservation');
const Stand = require('../Models/Stand'); // Assurez-vous de spécifier le bon chemin d'accès au modèle Stand
const Event = require('../Models/Event');

router.post('/createReservation', async (req, res) => {
    try {
      const { startDate, endDate, stand, event } = req.body;
  
      // Assurez-vous que les champs requis sont présents
      if (!startDate || !endDate || !stand || !event) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs requis.' });
      }
  
      console.log("Données reçues pour la réservation :", req.body);
  
      // Vérifiez que les ID de stand et d'événement sont valides
      const standExists = await Stand.findById(stand);
      const eventExists = await Event.findById(event);
  
      if (!standExists || !eventExists) {
        return res.status(404).json({ message: 'Stand ou événement non trouvé.' });
      }
  
      // Créez une nouvelle réservation
      const newReservation = new Reservation({
        startDate,
        endDate,
        stand,
        event
      });
  
      // Enregistrez la réservation dans la base de données
      await newReservation.save();
  
      res.status(201).json({ message: 'Réservation créée avec succès!' });
    } catch (error) {
      console.error('Erreur lors de la création de la réservation :', error);
      res.status(500).json({ message: 'Erreur lors de la création de la réservation.' });
    }
  });


router.get('/listeReservation/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('selectedStand selectedEvent');
        if (reservation) {
            res.json({ data: reservation });
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/updateReservation/:id', async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (updatedReservation) {
            res.json({ msg: 'Reservation updated successfully!', data: updatedReservation });
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/deleteReservation/:id', async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (deletedReservation) {
            res.json({ msg: 'Reservation deleted successfully' });
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
