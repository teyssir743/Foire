const User = require('../Models/User')

const getUserById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
  delete user.password
  res.json(user)
}

const createUser = async (req, res) => {
  const user = new User(req.body)
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const listUser = (req, res) => {
  User.find({})
    .then(result => {
      res.json({ data: result })
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
}

const listUserById = (req, res) => {
  User.findById(req.params.id).then(result => {
    if (result) {
      res.json({ data: result })
    } else {
      res.json({ error: "Veuillez vérifier l'ID" })
    }
  })
}

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.json({ msg: 'Mise à jour effectuée avec succès !' })
  })
}

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id).then(() => {
    res.json({ msg: 'Utilisateur supprimé avec succès' })
  })
}

const register = (req, res) => {
  let newUser = new User(req.body)
  newUser.save().then(() => {
    res.json({ msg: 'Compte créé avec succès' })
  })
}

module.exports = {
  createUser,
  register,
  deleteUser,
  getUserById,
  listUserById,
  listUser,
  updateUser
}
