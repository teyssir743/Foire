const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'teyssirteyeb@gmail.com',
      pass: '14035766Teyssir2002'
    }
  });


  

  module.exports.sendConfirmationEmail =  (email,activationCode) => {
    transport.sendMail({
        from: '"futurEvent" <futurEvent@gmail.com>', // Adresse expéditeur
        to: userEmail, // Adresse destinataire
        subject: 'Activation de compte', // Sujet de l'e-mail
        text: `Votre code d'activation est: ${activationCode}`, // Corps de l'e-mail en texte brut
        html: `<p>Votre code d'activation est: <b>${activationCode}</b>
       </p>`, // Corps de l'e-mail au format HTML
       
    

    })
    .catch ((err)=> console.log(err));
  };
  
  