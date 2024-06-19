const express = require('express')
const router = express.Router()
const reservationController = require('../Controller/reservationController')

router.post('/createReservation', reservationController.createReservation)

router.get('/listeReservation1', reservationController.listeReservation1)

router.get('/reservation/:id', reservationController.getReservationById)

router.put('/updateReservation/:id', reservationController.updateReservation)

router.delete('/deleteReservation/:id', reservationController.deleteReservation)

module.exports = router
