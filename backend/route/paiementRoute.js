const express = require('express')
const router = express.Router()
const paiementController = require('../Controller/paiementController')

// Route pour créer un nouveau Paiement
router.post('/createPaiement', paiementController.createPaiement)

//liste Paiement
router.get('/listePaiement', paiementController.listPaiement)

//rechercher Paiement by id
router.get('/listePaiement/:id', paiementController.getPaimentById)

// mise a jour du Paiement
router.put('/updatePaiement/:id', paiementController.UpdatePaiment)

// Route pour supprimer un Paiement
router.delete('/deletePaiement/:id', paiementController.deletePaiment)

module.exports = router
