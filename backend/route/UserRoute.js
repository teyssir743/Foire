const express = require('express');
const router = express.Router();

const User = require('../Models/User');

// Route pour créer un nouveau User
router.post('/createUser', async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser= await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour récupérer la liste des utilisateurs
router.get('/listeUser', (req, res) => {
    User.find({})
        .then((result) => {
            res.json({ data: result });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Rechercher un utilisateur par ID
router.get("/listeUser/:id", (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            if (result) {
                res.json({ data: result });
            } else {
                res.json({ error: "Veuillez vérifier l'ID" });
            }
        });
});

// Mise à jour d'un utilisateur
router.put("/updateUser/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.json({ msg: "Mise à jour effectuée avec succès !" });
        });
});

// Route pour supprimer un utilisateur
router.delete("/deleteUser/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ msg: "Utilisateur supprimé avec succès" });
        });
});






router.put("/changeRole/:id", (req, res) => {
  const { id } = req.params.id;
  const { role } = req.body;

  User.findByIdAndUpdate(id, { role }) // Mise à jour du rôle uniquement
    .then(() => {
      res.json({ msg: "Rôle de l'utilisateur modifié avec succès" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


// Route pour enregistrer un nouvel utilisateur
router.post('/register', (req, res) => {
    let newUser = new User(req.body)
    newUser.save()
        .then(() => {
            res.json({ msg: "Compte créé avec succès" });
        });
});



module.exports = router;
