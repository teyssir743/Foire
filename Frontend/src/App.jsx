
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import {Route,Routes} from 'react-router-dom'


import InterfaceVisiteur from './views/visiteur/InterfaceVisiteur';
import Register from './views/authentification/Register'
import Login from './views/authentification/Login'
import Vue from './views/visiteur/Vue';

import Dashbord from './views/Dashbord/Dashbord';


import AddUser from './views/user/AddUser'
import UpdateUser from './views/user/UpdateUser'
import ListeUsers from './views/user/ListeUsers'


import CreateEvent from './views/event/CreateEvent'
import ListeEvent from './views/event/ListeEvent'
import UpdateEvent from './views/event/UpdateEvent'
import DeleteEvent from './views/event/DeleteEvent'
import  EventGallery from './views/event/EventGallery'

import CreateStand from './views/stand/CreateStand';
import ListeStand from './views/stand/ListeStand';
import UpdateStand from './views/stand/UpdateStand';

import CreateInvitation from'./views/invitation/CreateInvitation';
import ListeInvitation from './views/invitation/ListeInvitation';
import UpdateInvitation from './views/invitation/UpdateInvitation';



import Contact from './views/visiteur/Contact';

import PaymentPage from './views/Paiement/PaymentPage';
import   PaymentListPage from './views/Paiement/ListeDePaiement'



import  InvitationForm from './views/invitation/Invitation';
import  Fonctionalite from './views/visiteur/Fonctionalite';

import Dash from './views/dash-bord/Dash';



function App() {

  return (
    <>
      

      <Routes>
     
        <Route path='/' element={ <InterfaceVisiteur/>}/>
        <Route path='/vue' element={ <Vue/>}/>

        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
       
        
        <Route path='/createEvent' element={ <CreateEvent/>}/>  
        <Route path='/listeEvent' element={ <ListeEvent/>}/>  
        <Route path='/updateEvent/:id' element={ <UpdateEvent/>}/>  
        <Route path='/deleteEvent' element={ <DeleteEvent/>}/> 
        <Route path='/EventGallery' element={ < EventGallery/>}/> 

        
        
        

        <Route path='/createStand' element={ <CreateStand/>}/> 
        <Route path='/listeStand' element={ <ListeStand/>}/>  
        <Route path='/updateStand/:id' element={ <UpdateStand/>}/> 
      
        <Route path='/createUser' element={ <AddUser/>}/> 
        <Route path='/listeUser' element={ <ListeUsers/>}/> 
        <Route path='/updateUser/:id' element={ <UpdateUser/>}/> 


        <Route path='/createInvitation' element={ <CreateInvitation/>}/> 
        <Route path='/ListeInvitation' element={ <ListeInvitation/>}/> 
        <Route path='/updateInvitation/:id' element={ <UpdateInvitation/>}/>

        <Route path='/dashbord' element={ <Dashbord/>}/>  
        <Route path='/visiteur' element={ <InterfaceVisiteur/>}/>
        <Route path='/contact' element={ <Contact/>}/>
        <Route path='/fonctionalité' element={ <Fonctionalite/>}/>

        <Route path='/payer' element={ <PaymentPage/>}/>
        <Route path='/listepayer' element={ <  PaymentListPage/>}/>
        <Route path='/invitation' element={ <  InvitationForm />}/>
        <Route path='/listeInvitation' element={ < ListeInvitation />}/>
      
        <Route path='/dash' element={ < Dash />}/>
       

      </Routes>



    </>
  )
}

export default App

