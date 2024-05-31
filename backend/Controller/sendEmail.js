// bib de l'envoie des emails
const nodemailer = require("nodemailer");


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
        from: '"futurEvent" <futurEvent@gmail.com>',
        to: email,
        subject: 'Activation de compte',
        text: `Votre code d'activation est: ${activationCode} `,
        html: `<p>Votre code d'activation est: <b>${activationCode}</b>
       </p>  <a href="http://localhost:5173/ActivationPage">Allez sur ce lien et tapez le code dans la zone de saisie </a> `,



    })
        .catch((err) => console.log(err));
};

module.exports = { sendConfirmationEmail };

