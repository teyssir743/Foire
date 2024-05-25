const express = require('express');
const Event = require('../Models/Event');
const Stand = require('../Models/Stand');
const Reservation = require('../Models/Reservation');
const router = express.Router();


// Route to create a new Reservation
router.post('/createReservation', async (req, res) => {
    const { name, email, phone, date, selectedStand } = req.body;
  
    try {
        const standModel = await Stand.findById(selectedStand);

        if (!standModel) {
            return res.status(404).json({ message: 'Stand not found' });
        }

        const reservation = new Reservation({
            name,
            email,
            phone,
            date,
            selectedStand,
        });

        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/listeReservation1', (req, res) => {
    Reservation.find({}) // Utilisez le modèle de réservation pour rechercher toutes les réservations
        .then((reservations) => {
            res.json({ data: reservations }); // Renvoie les données de réservation sous forme d'objet JSON
        })
        .catch((error) => {
            res.status(500).json({ error: error.message }); // Gestion des erreurs
        });
});



// Route to get all reservations
router.get('/listeReservation', async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('stand event');
        res.json({ data: reservations });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a reservation by ID
router.get('/listeReservation/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('stand event');
        if (reservation) {
            res.json({ data: reservation });
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update a reservation by ID
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

// Route to delete a reservation by ID
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