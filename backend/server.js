//create server
const express = require('express');
//instance de l'express
const app = express();
app.use(express.json());


const cors =require("cors");
app.use(cors());

//authentification
const AuthRoute = require ('./route/AuthRoute');
app.use ('/api/auth',AuthRoute);

//login
const LoginRoute = require ('./route/LoginRoute');
app.use ('/api/log',LoginRoute);


const EventRoute = require ('./route/EventRoute');
app.use ('/api/event',EventRoute);


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
app.use('/api/paiement',PaiementRoute);


// Montez le routeur adminRoute sous le préfixe '/api'
const AdminRoute = require('./route/AdminRoute');
app.use('/api/admin',AdminRoute);


// Montez le routeur Client Route sous le préfixe '/api'
const ClientRoute = require('./route/ClientRoute');
app.use('/api/client',ClientRoute);


// Montez le routeur Foire Route sous le préfixe '/api'
const  FoireRoute = require('./route/FoireRoute');
app.use('/api/foire',FoireRoute);





//connect to bd
const mongoose=require ('mongoose');
mongoose.connect('mongodb+srv://teyssir:14035766@cluster0.brvirxu.mongodb.net/Foire')
.then(()=>{console.log("data base connected");})
.catch(err => {console.log(err);})





//activer sur le port 5000 et fonction flechee callback : localhost:5000 
app.listen(5000,()=> console.log("serveur en marche"));




