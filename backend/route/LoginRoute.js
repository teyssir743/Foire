const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/User');

 

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Recherche de l'utilisateur dans la base de données par email
        const user = await User.findOne({ email });

        // Vérification si l'utilisateur existe et si le mot de passe est correct
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }


       



        

        // Authentification réussie
        res.json({ msg: 'Authentification réussie', user });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

module.exports = router;
