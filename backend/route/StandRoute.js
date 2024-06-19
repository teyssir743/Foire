const express = require('express')
const router = express.Router()
const standController = require('../Controller/standController')

// Route pour récupérer la liste des stands
router.get('/listeStand', standController.listStand)

// Route pour récupérer les détails d'un stand par son ID
router.get('/listeStand/:id', standController.getStandById)

// Route pour créer un nouveau stand
router.post('/createStand', standController.createStand)

// Route pour mettre à jour un stand
router.put('/updateStand/:id', standController.updateStand)

// Route pour supprimer un stand
router.delete('/deleteStand/:id', standController.deleteStand)

router.put(
  '/updateAllStandsAvailable',
  standController.updateAllStandsAvailable
)

module.exports = router
