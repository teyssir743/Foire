const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')

router.get('/getUser/:id', userController.getUserById)

// Route pour créer un nouveau User
router.post('/createUser', userController.createUser)

// Route pour récupérer la liste des utilisateurs
router.get('/listeUser', userController.listUser)

// Rechercher un utilisateur par ID
router.get('/listeUser/:id', userController.getUserById)

// Mise à jour d'un utilisateur
router.put('/updateUser/:id', userController.updateUser)

// Route pour supprimer un utilisateur
router.delete('/deleteUser/:id', userController.deleteUser)

// Route pour enregistrer un nouvel utilisateur
router.post('/register', userController.register)

module.exports = router
