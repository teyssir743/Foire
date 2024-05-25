
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Route,Routes} from 'react-router-dom'


import InterfaceVisiteur from './views/visiteur/InterfaceVisiteur';
import Vue from './views/visiteur/Vue';



import Register from './views/authentification/Register';
import Login from './views/authentification/Login';




import Calendar  from './views/interfaceExposant/Calendar';






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
import Gallerystand  from './views/stand/Gallerystand';


import CreateInvitation from'./views/invitation/CreateInvitation';
import ListeInvitation from './views/invitation/ListeInvitation';
import UpdateInvitation from './views/invitation/UpdateInvitation';



import CreateReservation from './views/reservation/CreateReservation';
import ListeReservation from './views/reservation/ListeReservation';
import UpdateReservation from './views/reservation/UpdateReservation';
import DeleteReservation from './views/reservation/DeleteReservation';

import  PaymentPage from './views/Paiement/PaymentPage';
import   PaymentListPage from './views/Paiement/ListeDePaiement';



import  InvitationForm from './views/invitation/Invitation';



import  Fonctionalite from './views/visiteur/Fonctionalite';
import Contact from './views/visiteur/Contact';


import UpdateFoire from "./views/foire/UpdateFoire";
import CreateFoire from './views/foire/CreateFoire';
import ListeFoire from './views/foire/ListeFoire';
import DeleteFoire from './views/foire/DeleteFoire';



import DashContent from './views/dash-bord/Dash-content';
import Dash from './views/dash-bord/Dash';
import DashbordPage from './views/dash-bord/DashbordPage';
import CalendrierDash from './views/dash-bord/CalendrierDash';
import Faq from './views/dash-bord/Faq';

import ActivationPage from './views/authentification/ActivationPage';

import AdminForm from './views/admin/Admin';
import ListeAdmin from './views/admin/ListeAdmin';
import ListeStand1 from './views/stand/Stand-Liste';
import UpdateAdmin from './views/admin/UpdateAdmin'
import ListePaiements from './views/Paiement/ListeDePaiement';
import Login_admin from './views/dash-bord/loginAdmin';
import Register_admin from './views/dash-bord/Register_admin';
import Payment_admin from './views/dash-bord/Payment_admin';







function App() {

  return (
    <>
      

      <Routes>

      

      <Route path='/admin' element={ <AdminForm/>}/>
      <Route path='/listeAdmin' element={ <ListeAdmin/>}/>
      <Route path='/UpdateAdmin' element={ <UpdateAdmin/>}/>
      <Route path="/UpdateAdmin/:id" element={<UpdateAdmin />} />
      <Route path="/login_admin" element={<Login_admin />} />
      <Route path="/Register_admin" element={<Register_admin />} />
      <Route path="/Payment_admin" element={<Payment_admin />} />
      
   
      


       {/* visiteur*/ }
        <Route path='/contact' element={ <Contact/>}/>
        <Route path='/fonctionalité' element={ <Fonctionalite/>}/>
        <Route path='/' element={ <InterfaceVisiteur/>}/>
        
        

      {/*compte user*/}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/confirm/:activationcode' element={<ActivationPage/>}/>
       
        
       {/*calendrier*/}
       <Route path='/Calendar' element={<Calendar/>}/>


        
        {/*dashbord*/}
        <Route path='/DashContent' element={ <DashContent/>}/>
        <Route path='/dash' element={ <Dash/>} /> 
        <Route path='/DashbordPage' element={ <DashbordPage/>} /> 
        <Route path='/CalendrierDash' element={ <CalendrierDash/>} /> 
        <Route path='/Faq' element={ <Faq/>} /> 
  
       
        
        

        {/*event*/}
        <Route path='/createEvent' element={ <CreateEvent/>}/>
         <Route path='/listeEvent' element={  <ListeEvent/> } />
        <Route path='/updateEvent/:id' element={ <UpdateEvent/>}/>  
        <Route path='/deleteEvent' element={ <DeleteEvent/>}/> 
        <Route path='/EventGallery' element={ < EventGallery/>}/> 

        
        
       {/*stand*/}

        <Route path='/createStand' element={ <CreateStand/>}/> 
        <Route path='/listeStand' element={ <ListeStand/>}/>
        <Route path='/listeStand1' element={ <ListeStand1/>}/>  
        <Route path='/updateStand/:id' element={ <UpdateStand/>}/> 
        <Route path='/Gallerystand' element={ <Gallerystand/>}/> 
        
      

         {/*user*/}
        <Route path='/createUser' element={ <AddUser/>}/> 
        <Route path='/listeUser' element={ <ListeUsers/>}/> 
        <Route path='/updateUser/:id' element={ <UpdateUser/>}/> 



        {/*invitation*/}
        <Route path='/createInvitation' element={ <CreateInvitation/>}/> 
        <Route path='/ListeInvitation' element={ <ListeInvitation/>}/> 
        <Route path='/updateInvitation/:id' element={ <UpdateInvitation/>}/>
        <Route path='/invitation' element={ <  InvitationForm />}/>
        <Route path='/listeInvitation' element={ < ListeInvitation />}/>
      

      
       




        {/*paiement*/}
        <Route path='/payer' element={ <PaymentPage/>}/>
        <Route path='/ListeDePaiement' element={ <ListePaiements/>}/>
        ListeDePaiement


          
      
        {/*reservation*/}
        <Route path='/createReservation' element={<CreateReservation/>}/>
        <Route path='/listeReservation' element={<ListeReservation/>}/>
        <Route path='/updateReservation/:id' element={<UpdateReservation/>}/>
        <Route path='/deleteReservation/:id' element={<DeleteReservation/>}/>


         {/* Foire*/ }
        <Route path='/createFoire' element={<CreateFoire/>}/>
        <Route path='/listeFoire' element={<ListeFoire/>}/>
        <Route path='/updateFoiren/:id' element={<UpdateFoire/>}/>
        <Route path='/deleteFoire/:id' element={<DeleteFoire/>}/>
        <Route path='/vue' element={ <Vue/>}/>

       
      
      
      
      </Routes>



    </>
  )
}

export default App

