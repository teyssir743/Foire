const Stand = require('../Models/Stand')


const listStand = async (req, res) => {
  try {
    const stands = await Stand.find({})
    res.json({ data: stands })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


const getStandById = async (req, res) => {
  try {
    const stand = await Stand.findById(req.params.id)
    if (stand) {
      res.json({ data: stand })
    } else {
      res.status(404).json({ error: 'Stand non trouvé' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


const createStand = async (req, res) => {
  // Extraction des données du corps de la requête
  const { nom, num, emplacement, taille, etat, prixLocation } = req.body

  // Création d'une nouvelle instance de Stand avec les données extraites
  const stand = new Stand({
    nom,
    num,
    emplacement,
    taille,
    etat,
    prixLocation
  })

  try {
    // Enregistrement du nouveau stand dans la base de données
    const newStand = await stand.save()
    res.status(201).json(newStand)
  } catch (err) {
    // Gestion des erreurs
    res.status(400).json({ message: err.message })
  }
}


const updateStand = async (req, res) => {
  try {
    await Stand.findByIdAndUpdate(req.params.id, req.body)
    res.json({ msg: 'Mise à jour effectuée avec succès !' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteStand = async (req, res) => {
  try {
    await Stand.findByIdAndDelete(req.params.id)
    res.json({ msg: 'Stand supprimé avec succès' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


const updateAllStandsAvailable = async (req, res) => {
  try {
    const result = await Stand.updateMany(
      {},
      { $set: { etat: 'disponible', isReserved: false } }
    )

    res.json({
      msg: 'Tous les stands sont maintenant disponibles',
      result
    })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while updating the stands' })
  }
}


module.exports = {createStand,listStand,getStandById,updateStand,deleteStand,updateAllStandsAvailable}