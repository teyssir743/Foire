const Paiement = require('../Models/Paiement')

const createPaiement = async (req, res) => {
  const paiement = new Paiement(req.body)
  try {
    const newPaiement = await paiement.save()
    res.status(201).json(newPaiement)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const listPaiement = (req, res) => {
  Paiement.find({}).then(result => {
    res.json({ data: result })
  })
}

const getPaimentById = (req, res) => {
  Paiement.findById(req.params.id).then(result => {
    if (result) {
      res.json({ data: result })
    } else {
      res.json({ error: "veuillez verifier l'id" })
    }
  })
}

const UpdatePaiment = (req, res) => {
  Paiement.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.json({ msg: 'mise a jour bien avec succes !' })
  })
}

const deletePaiment = (req, res) => {
  Paiement.findByIdAndDelete(req.params.id).then(() => {
    res.json({ msg: 'Paiement supprimée avec succes ' })
  })
}

module.exports = {
  createPaiement,
  getPaimentById,
  UpdatePaiment,
  deletePaiment,
  listPaiement
}
