// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 5000;

app.use(bodyParser.json());

// Remplacez par vos informations de configuration SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail', // Par exemple, 'gmail'
    auth: {
        user: 'vwiembannour157@gmail.com',
        pass: 'votre-mot-de-passe-email'
    }
});

app.post('/api/log/forgot-password', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ message: 'Email est requis' });
    }

    // Génération d'un code de récupération
    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Envoyer l'email avec le code de récupération
    const mailOptions = {
        from: 'votre-email@gmail.com',
        to: email,
        subject: 'Réinitialisation du mot de passe',
        text: `Votre code de récupération est : ${recoveryCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: 'Erreur lors de l\'envoi de l\'email' });
        }
        console.log('Email envoyé: ' + info.response);
        res.status(200).send({ message: 'Code de récupération envoyé à votre adresse email' });
    });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${5000}`);
});
