const express = require('express')
const router = express.Router()
const invitationConntroller = require('../Controller/invitationController')

// Fonction pour envoyer un email

// Route pour créer une invitation et envoyer des emails à tous les utilisateurs
router.post('/createInvitation', invitationConntroller.createInvitation)

module.exports = router
