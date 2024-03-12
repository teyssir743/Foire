const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../Models/User');

router.post('/register', async (req, res) => {
    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            // Si l'utilisateur existe déjà, renvoyer un message approprié au client
            return res.status(400).json({ msg: "Cette adresse email est déjà utilisée" });
        }

        // Créer un nouvel utilisateur uniquement si l'e-mail n'est pas déjà utilisé
        let newUser = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        newUser.password = hashedPassword;
        await newUser.save();

        res.json({ msg: "Utilisateur créé avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
    }
});

module.exports = router;
