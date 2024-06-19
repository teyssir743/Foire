const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require('jsonwebtoken')
const { sendConfirmationEmail, sendResetEmail } = require('./nodeMailer');



function generateActivationKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let activationKey = '';
    for (let i = 0; i < length; i++) {
        activationKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return activationKey;
}


const register = async (req, res) => {
    console.log("hello")
    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            // Si l'utilisateur existe déjà, renvoyer un message approprié au client
            return res.status(400).json({ msg: "Cette adresse email est déjà utilisée." });
        }

        // Créer un nouvel utilisateur uniquement si l'e-mail n'est pas déjà utilisé
        let newUser = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        newUser.password = hashedPassword;

        // Générer une clé d'activation
        const activationKey = generateActivationKey(10); // Longueur de la clé d'activation

        // Assigner la clé d'activation à l'utilisateur
        newUser.activationCode = activationKey;

        // Envoyer l'email de confirmation
        await sendConfirmationEmail(newUser.email, newUser.activationCode);

        await newUser.save();
        res.json({ msg: "Utilisateur créé avec succès." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.json({ error: "addresse email n'existe pas !" })
        }

        if (user.isActive == false) {
            return res.json({ error: "ce compte n'est pas activé  voir votre boite-email" })
        }
        bcrypt.compare(req.body.password, user.password, (err, kifkif) => {
            if (err) {
                console.log(err)
            }
            if (kifkif == true) {

                const payload = {
                    email: user.email,
                    id: user._id,
                    username: user.username,
                    lastname: user.lastname
                }

                let token = jwt.sign(payload, "secret")

                res.json({ msg: "connecté avec succes", token: token, user: user })
            } else {
                return res.json({ error: "mot de passe incorrecte" })
            }
        })

    } catch (err) {
        console.log(err)
    }
}
const activation = async (req, res) => {
    try {
        const user = await User.findOne({ activationCode: req.body.code });
        if (!user) {
            return res.status(400).send({ error: "Ce code d'activation est incorrect." });
        }

        user.isActive = true;
        await user.save();
        res.send({ message: "Le compte a été activé avec succès !" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Erreur lors de l'activation du compte." });
    }
}

const resetPassword = async (req, res) => {
    const { password } = req.body;
    try {
        const user = await User.findOne({ resetPasswordCode: req.params.id });
        if (!user) {
            return res.status(404).json({ error: 'code non trouvée' });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;

        await user.save();

        res.json({ message: 'mot de passe modifié avec success !' });
    } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation de mot de passe :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la demande de réinitialisation de mot de passe.' });
    }
}


const askForResetPassword = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'Adresse e-mail non trouvée' });
        }


        const resetToken = jwt.sign({ _id: user._id }, "secret", { expiresIn: '15m' });


        user.resetPasswordCode = resetToken;
        await user.save();


        const resetPasswordLink = `http://localhost:5173/reset-password/${resetToken}`;
        sendResetEmail(user.email, resetPasswordLink)

        res.json({ message: 'Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.' });
    } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation de mot de passe :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la demande de réinitialisation de mot de passe.' });
    }
}


const updateUser = async (req, res) => {
    console.log(req.body)
    if (req.body.password?.length > 0) {
        let newUser = new User(req.body)

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err)
            }
            bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {

                if (err) {
                    console.log(err)
                }

                newUser.password = hashedPassword
                await User.findOneAndUpdate({ _id: req.params.id }, newUser)

                const user = await User.findOne({ _id: req.params.id })
                res.json({ user: user })

            })
        })
    } else {
        await User.findOneAndUpdate({ _id: req.params.id }, req.body)

        const user = await User.findOne({ _id: req.params.id })
        delete user.password
        res.json({ user: user })
    }


}
      

module.exports = { login, register, activation, resetPassword, askForResetPassword, updateUser }        