const nodemailer = require('nodemailer');

// Fonction pour envoyer un e-mail d'activation
async function sendActivationEmail(userEmail, activationCode) {
    try {
        // Créer un transporteur SMTP réutilisable à l'aide du service SMTP par défaut
        let transporter = nodemailer.createTransport({
            host: 'smtp.example.com', // Remplacez par l'hôte de votre serveur SMTP
            port: 587, // Remplacez par le port de votre serveur SMTP
            secure: false, // true pour le port 465, false pour les autres ports
            auth: {
                user:'teyssirteyeb@gmail.com', // Remplacez par votre adresse e-mail
                pass: 'Teyssir14035766' // Remplacez par votre mot de passe
            }
        });

        // Envoyer l'e-mail avec les options spécifiées
        let info = await transporter.sendMail({
            from: '"Votre Nom" <your-email@example.com>', // Adresse expéditeur
            to: userEmail, // Adresse destinataire
            subject: 'Activation de compte', // Sujet de l'e-mail
            text: `Votre code d'activation est: ${activationCode}`, // Corps de l'e-mail en texte brut
            html: `<p>Votre code d'activation est: <b>${activationCode}</b>
            <a href=http://localhost:5173/confirm/${activationLink}"> Activer votre compte </a> </p>`, // Corps de l'e-mail au format HTML
           
        
        });

        console.log('E-mail envoyé: %s', info.messageId);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
    }
}

module.exports = { sendActivationEmail };
