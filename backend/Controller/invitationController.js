const Invitation = require('../models/Invitation')
const User = require('../Models/User')
const nodemailer = require('nodemailer')

async function sendEmail (to, subject, text, senderName) {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: '7516da001@smtp-brevo.com', // generated ethereal user
        pass: 'cxTHVwp59hsO1CyG' // generated ethereal password
      }
    })

    //la7dha ok

    let mailOptions = {
      from: 'FuturEvent@gmail.com',
      to: to,
      subject: subject,
      text: text
    }

    let info = await transporter.sendMail(mailOptions)
    console.log(`Email envoyé à ${to}:`, info.response)
    return info.response
  } catch (error) {
    console.error(`Erreur lors de l'envoi à ${to}:`, error)
    throw error
  }
}


const createInvitation = async (req, res) => {
  const invitation = new Invitation(req.body)
  try {
    console.log("Tentative d'enregistrement de l'invitation...")
    const newInvitation = await invitation.save()
    console.log('Invitation enregistrée:', newInvitation)

    // Récupérer tous les utilisateurs
    console.log('Récupération de tous les utilisateurs...')
    const users = await User.find({})
    const emailList = users.map(user => user.email) // ["teyssirteyeb@gmail.com"]  //
    console.log('Liste des emails des utilisateurs:', emailList)

    // Envoyer l'email à chaque utilisateur
    for (const email of emailList) {
      try {
        console.log(`Envoi de l'email à ${email}...`)
        await sendEmail(
          email,
          'Invitation',
          req.body.invitationMessage,
          req.body.senderName
        )
      } catch (error) {
        console.error(`Erreur lors de l'envoi de l'email à ${email}:`, error)
      }
    }

    res.status(201).json(newInvitation)
  } catch (err) {
    console.error("Erreur lors de la création de l'invitation:", err)
    res.status(400).json({ message: err.message })
  }
}


module.exports = {createInvitation}