const Reservation = require('../Models/Reservation')
const Stand = require('../Models/Stand') // Assurez-vous de spécifier le bon chemin d'accès au modèle Stand
const Event = require('../Models/Event')


const createReservation = async (req, res) => {
  try {
    const { startDate, endDate, stand, event, user } = req.body

    // Assurez-vous que les champs requis sont présents
    if (!startDate || !endDate || !stand || !event || !user) {
      return res
        .status(400)
        .json({ message: 'Veuillez remplir tous les champs requis.' })
    }

    console.log('Données reçues pour la réservation :', req.body)

    // Vérifiez que les ID de stand et d'événement sont valides
    const standExists = await Stand.findById(stand)
    const eventExists = await Event.findById(event)

    if (!standExists || !eventExists) {
      return res.status(404).json({ message: 'Stand ou événement non trouvé.' })
    }

    // Créez une nouvelle réservation
    const newReservation = new Reservation({
      startDate,
      endDate,
      stand,
      event,
      user
    })

    // Enregistrez la réservation dans la base de données
    await newReservation.save()
    await Stand.findByIdAndUpdate(stand, { etat: 'reservé' })

    res.status(201).json({ message: 'Réservation créée avec succès!' })
  } catch (error) {
    console.error('Erreur lors de la création de la réservation :', error)
    res
      .status(500)
      .json({ message: 'Erreur lors de la création de la réservation.' })
  }
}


const listeReservation1 = (req, res) => {
  Reservation.find({})
    .populate('user')
    .then(result => {
      res.json(result) // Envoyez directement les données sans les envelopper dans un objet
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
}

const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate(
      'user'
    )
    if (reservation) {
      res.json({ data: reservation })
    } else {
      res.status(404).json({ error: 'Réservation non trouvée' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


const updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (updatedReservation) {
      res.json({
        msg: 'Réservation mise à jour avec succès!',
        data: updatedReservation
      })
    } else {
      res.status(404).json({ error: 'Réservation non trouvée' })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


const deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id
    )
    if (deletedReservation) {
      res.json({ msg: 'Reservation deleted successfully' })
    } else {
      res.status(404).json({ error: 'Reservation not found' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


module.exports = {createReservation,listeReservation1,getReservationById,updateReservation,deleteReservation}