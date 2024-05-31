//create server
const express = require('express');
//instance de l'express
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');
const verifyToken = require('./middlewares/verifyToken')
const dotenv = require('dotenv');
// Charger les variables d'environnement à partir du fichier .env
dotenv.config();


const cors = require("cors");
app.use(cors());


//forgot and reser password
const forgotPasswordRoutes = require('./route/forgotPasswordRoutes');
const resetPasswordRoutes = require('./route/resetPasswordRoutes');
app.use('/api/forgot-password', forgotPasswordRoutes);
app.use('/api/reset-password', resetPasswordRoutes);



//authentification
const AuthRoute = require('./route/AuthRoute');
app.use('/api/auth', AuthRoute);


//login
const LoginRoute = require('./route/LoginRoute');
app.use('/api/log', LoginRoute);


const EventRoute = require('./route/EventRoute');
app.use('/api/event', EventRoute);


// Montez le routeur standRoute sous le préfixe '/api'
const StandRoute = require('./route/StandRoute');
app.use('/api/stand', StandRoute);



// Montez le routeur invitationRoute sous le préfixe '/api'
const InvitationRoute = require('./route/InvitationRoute');
app.use('/api/invitation', InvitationRoute);
     

// Montez le routeur UserRoute sous le préfixe '/api'
const UserRoute = require('./route/UserRoute');
app.use('/api/user', UserRoute);

// Montez le routeur reservationRoute sous le préfixe '/api'
const ReservationRoute = require('./route/ReservationRoute');
app.use('/api/reservation', ReservationRoute);

// Montez le routeur paiementRoute sous le préfixe '/api'
const PaiementRoute = require('./route/paiementRoute');
app.use('/api/paiement', PaiementRoute);


// Montez le routeur adminRoute sous le préfixe '/api'
const AdminRoute = require('./route/AdminRoute');
app.use('/api/admin', AdminRoute);




// Montez le routeur Foire Route sous le préfixe '/api'
const FoireRoute = require('./route/FoireRoute');
app.use('/api/foire', verifyToken, FoireRoute);


// Importez votre modèle de stand
const Stand = require('./Models/Stand');

// Route API pour vérifier la disponibilité des stands à une date donnée
app.get('/api/stand/availability', verifyToken, async (req, res) => {
    try {
        // Récupérer la date à vérifier à partir de la requête (passée en tant que paramètre de requête)
        const { date } = req.query;

        // Interrogez la base de données pour vérifier si des stands sont réservés à la date donnée
        const reservedStands = await Stand.find({
            reservedDates: { $elemMatch: { date } }
        });

        // Si aucun stand n'est réservé à la date donnée, ils sont disponibles
        const isAvailable = reservedStands.length === 0;

        // Envoyer la réponse au frontend
        res.json({ isAvailable });
    } catch (error) {
        console.error('Erreur lors de la vérification de la disponibilité des stands :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});


//connect to bd
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://teyssir:14035766@cluster0.brvirxu.mongodb.net/Foire')
    .then(() => { console.log("data base connected"); })
    .catch(err => { console.log(err); })

//activer sur le port 5000 et fonction flechee callback : localhost:5000     
app.listen(5000, () => console.log("serveur en marche"));








