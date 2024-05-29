const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Route pour générer un token de réinitialisation de mot de passe
router.post('/', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Adresse e-mail non trouvée' });
        }

        // Générer un token de réinitialisation de mot de passe
        const resetToken = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '15m' });

        // Enregistrer le token de réinitialisation de mot de passe dans la base de données
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 900000; // 15 minutes
        await user.save();

        // Envoyer un e-mail de réinitialisation de mot de passe (à implémenter)
        const resetPasswordLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
        // Envoyer l'e-mail avec le lien de réinitialisation à l'utilisateur (utilisez un service comme nodemailer pour envoyer l'e-mail)

        res.json({ message: 'Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.' });
    } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation de mot de passe :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la demande de réinitialisation de mot de passe.' });
    }
});

module.exports = router;
