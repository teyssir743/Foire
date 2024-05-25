const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../Models/Admin');





// Route pour créer un nouvel administrateur
router.post('/createAdmin', async (req, res) => {
    console.log('Received data:', req.body);
    try {
        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Créer un nouvel administrateur avec le mot de passe haché
        const newAdmin = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (err) {
        console.error('Error while saving admin:', err);
        res.status(400).json({ message: err.message });
    }
});

// Liste des administrateurs
router.get('/listeAdmin', async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.json({ data: admins });
    } catch (err) {
        console.error('Error while fetching admins:', err);
        res.status(400).json({ message: err.message });
    }
});

// Rechercher un administrateur par ID
router.get('/listeAdmin/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (admin) {
            res.json({ data: admin });
        } else {
            res.status(404).json({ error: "Veuillez vérifier l'ID" });
        }
    } catch (err) {
        console.error('Error while fetching admin by ID:', err);
        res.status(400).json({ message: err.message });
    }
});

// Mise à jour d'un administrateur
router.put('/updateAdmin/:id', async (req, res) => {
    try {
        // Vérifier si une mise à jour du mot de passe est nécessaire
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedAdmin) {
            res.json({ msg: "Mise à jour réussie !", data: updatedAdmin });
        } else {
            res.status(404).json({ error: "Veuillez vérifier l'ID" });
        }
    } catch (err) {
        console.error('Error while updating admin:', err);
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer un administrateur
router.delete('/deleteAdmin/:id', async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (deletedAdmin) {
            res.json({ msg: "Administrateur supprimé avec succès" });
        } else {
            res.status(404).json({ error: "Veuillez vérifier l'ID" });
        }
    } catch (err) {
        console.error('Error while deleting admin:', err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
