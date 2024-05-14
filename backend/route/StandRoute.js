const express = require('express');
const router = express.Router();
const Stand = require('../Models/Stand'); 

// Route pour récupérer la liste des stands
router.get('/listeStand', async (req, res) => {
    try {
        const stands = await Stand.find({});
        res.json({ data: stands });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour rechercher un stand par son ID
router.get("/listeStand/:id", async (req, res) => {
    try {
        const stand = await Stand.findById(req.params.id);
        if (stand) {
            res.json({ data: stand });
        } else {
            res.status(404).json({ error: "Veuillez vérifier l'ID" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour créer un nouveau stand
router.post('/createStand', async (req, res) => {
    // Extraction des données du corps de la requête
    const { nom,num, emplacement, taille, etat, prixLocation } = req.body;
    
    // Création d'une nouvelle instance de Stand avec les données extraites
    const stand = new Stand({
        nom,
        num,
        emplacement,
        taille,
        etat,
        prixLocation
    });

    try {
        // Enregistrement du nouveau stand dans la base de données
        const newStand = await stand.save();
        res.status(201).json(newStand);
    } catch (err) {
        // Gestion des erreurs
        res.status(400).json({ message: err.message });
    }
});

// Route pour mettre à jour un stand
router.put("/updateStand/:id", async (req, res) => {
    try {
        await Stand.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: "Mise à jour effectuée avec succès !" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route pour supprimer un stand
router.delete("/deleteStand/:id", async (req, res) => {
    try {
        await Stand.findByIdAndDelete(req.params.id);
        res.json({ msg: "Stand supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
