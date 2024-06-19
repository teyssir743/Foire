const eventModel = require('../Models/Event')

const listEvents1 = (req, res) => {
  eventModel
    .find({})
    .then(result => {
      res.json(result) // Envoyez directement les données sans les envelopper dans un objet
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
}

const listEvent = (req, res) => {
  eventModel.find({}).then(result => {
    res.json({ data: result })
  })
}

const getEventById = (req, res) => {
  //eventModel.find({_id: req.params.id})
  eventModel.findById(req.params.id).then(result => {
    if (result) {
      res.json({ data: result })
    } else {
      res.json({ error: "veuillez verifier l'id" })
    }
  })
}

const createEvent = async (req, res) => {
  const newEvent = new eventModel({
    ...req.body,
    image: `${req.file.filename}`
  })
  await newEvent
    .save()
    .then(() => {
      res.json({ msg: 'event enregistré avec success' })
    })
    .catch(err => {
      console.log(err)
    })
}

const updateEvent = (req, res) => {
  eventModel.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.json({ msg: 'mise a jour bien avec succes !' })
  })
}

const deleteEvent = (req, res) => {
  eventModel.findByIdAndDelete(req.params.id).then(() => {
    res.json({ msg: 'event supprimée avec succes ' })
  })
}

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({})
    res.json({ data: events })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getEventById2 = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (event) {
      res.json({ data: event })
    } else {
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getEventById2,
  getEvents,
  deleteEvent,
  updateEvent,
  createEvent,
  getEventById,
  listEvent,
  listEvents1
}
