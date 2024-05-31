const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "nourhb58@gmail.com",
    pass: "MWDYR8NzHBpO1jgK",
  },
});



module.exports.sendConfirmationEmail = (email, activationCode) => {
  mailTransporter.sendMail({
    from: '"futurEvent" <futurEvent@gmail.com>', // Adresse expéditeur
    to: email, // Adresse destinataire
    subject: 'Activation de compte', // Sujet de l'e-mail
    text: `Votre code d'activation est: ${activationCode}`, // Corps de l'e-mail en texte brut
    html: ` <a href="http://localhost:5173/ActivationPage"> suivire ve lien </a>  <p> Votre code d'activation est: <b>${activationCode}</b>
       </p>`, // Corps de l'e-mail au format HTML



  })
    .catch((err) => console.log(err));
};

module.exports.sendResetEmail = (email, resetLink) => {
  mailTransporter.sendMail({
    from: '"futurEvent" <futurEvent@gmail.com>', // Adresse expéditeur
    to: email,
    subject: 'Réinitialisation du mot de passe', // Sujet de l'e-mail
    text: `Suivre le lien`, // Corps de l'e-mail en texte brut
    html: `<a href=${resetLink}>Réinitialiser le mot de passe 
       </a>`,



  })
    .catch((err) => console.log(err));
};



