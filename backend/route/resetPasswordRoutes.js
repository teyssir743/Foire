const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Route pour réinitialiser le mot de passe
router.post('/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
        const user = await User.findOne({
            _id: decoded._id,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Le lien de réinitialisation de mot de passe est invalide ou a expiré.' });
        }

        // Mettre à jour le mot de passe de l'utilisateur
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Mot de passe réinitialisé avec succès.' });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(400).json({ error: 'Le lien de réinitialisation de mot de passe est invalide ou a expiré.' });
        }
        console.error('Erreur lors de la réinitialisation du mot de passe :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la réinitialisation du mot de passe.' });
    }
});


module.exports = router;
