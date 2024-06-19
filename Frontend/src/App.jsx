
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'


import InterfaceVisiteur from './views/visiteur/InterfaceVisiteur';
import Vue from './views/visiteur/Vue';



import Register from './views/authentification/Register';
import Login from './views/authentification/Login';
import ResetPassword from './views/authentification/ResetPassword';



import Calendar from './views/interfaceExposant/Calendar';






import AddUser from './views/user/AddUser'
import UpdateUser from './views/user/UpdateUser'
import ListeUsers from './views/user/ListeUsers'


import CreateEvent from './views/event/CreateEvent'
import ListeEvent from './views/event/ListeEvent'
import UpdateEvent from './views/event/UpdateEvent'
import DeleteEvent from './views/event/DeleteEvent'
import EventGallery from './views/event/EventGallery'




import CreateStand from './views/stand/CreateStand';
import ListeStand from './views/stand/ListeStand';
import UpdateStand from './views/stand/UpdateStand';
import Gallerystand from './views/stand/Gallerystand';


import CreateInvitation from './views/invitation/CreateInvitation';
import ListeInvitation from './views/invitation/ListeInvitation';
import UpdateInvitation from './views/invitation/UpdateInvitation';



import CreateReservation from './views/reservation/CreateReservation';
import ListeReservation from './views/reservation/ListeReservation';
import UpdateReservation from './views/reservation/UpdateReservation';
import DeleteReservation from './views/reservation/DeleteReservation';

import PaymentPage from './views/Paiement/PaymentPage';
import PaymentListPage from './views/Paiement/ListeDePaiement';



import InvitationForm from './views/invitation/Invitation';



import Fonctionalite from './views/visiteur/Fonctionalite';
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
import ProtectedExpoRoute from './views/layout/ProtectedExpoRoutes';
import Unauthorized from './views/layout/unauthorized';
import ProtectedAdminRoute from './views/layout/ProtectedAdminRoutes';
import AdminProfile from './views/authentification/AdminProfile';
import ExposantProfile from './views/authentification/ExposantProfile';









function App() {

  return (
    <>


      <Routes>


        <Route path="/ActivationPage" element={<ActivationPage />}></Route>

        <Route path="/reset-password/:id" element={<ResetPassword />}></Route>


        <Route path='/admin' element={<AdminForm />} />
        <Route path='/listeAdmin' element={<ListeAdmin />} />
        <Route path='/UpdateAdmin' element={<UpdateAdmin />} />
        <Route path="/UpdateAdmin/:id" element={<UpdateAdmin />} />
        <Route path="/login_admin" element={<Login_admin />} />
        <Route path="/Register_admin" element={<Register_admin />} />
        <Route path="/Payment_admin" element={<Payment_admin />} />







        {/* visiteur*/}
        <Route path='/contact' element={<Contact />} />
        <Route path='/fonctionalité' element={<Fonctionalite />} />
        <Route path='/' element={<InterfaceVisiteur />} />



        {/*compte user*/}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/confirm/:activationcode' element={<ActivationPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/*calendrier*/}
        <Route path='/Calendar' element={<Calendar />} />



        {/*dashbord*/}
        <Route path='/DashContent' element={<DashContent />} />
        <Route path='/dash' element={<Dash />} />
        <Route path='/DashbordPage' element={<ProtectedAdminRoute><DashbordPage /></ProtectedAdminRoute>} />
        <Route path='/admin_profile' element={<ProtectedAdminRoute><AdminProfile /></ProtectedAdminRoute>} />

        <Route path='/CalendrierDash' element={<CalendrierDash />} />
        <Route path='/Faq' element={<Faq />} />


        <Route path='/expo_profile' element={<ProtectedExpoRoute><ExposantProfile /></ProtectedExpoRoute>} />



        {/*event*/}
        <Route path='/createEvent' element={<ProtectedExpoRoute><CreateEvent /></ProtectedExpoRoute>} />
        <Route path='/listeEvent' element={<ProtectedExpoRoute><ListeEvent /> </ProtectedExpoRoute>} />
        <Route path='/updateEvent/:id' element={<ProtectedExpoRoute><UpdateEvent /></ProtectedExpoRoute>} />
        <Route path='/deleteEvent' element={<ProtectedExpoRoute><DeleteEvent /></ProtectedExpoRoute>} />
        <Route path='/EventGallery' element={<ProtectedExpoRoute>< EventGallery /></ProtectedExpoRoute>} />



        {/*stand*/}

        <Route path='/createStand' element={<ProtectedExpoRoute><CreateStand /></ProtectedExpoRoute>} />
        <Route path='/listeStand' element={<ProtectedExpoRoute><ListeStand /></ProtectedExpoRoute>} />
        <Route path='/listeStand1' element={<ProtectedExpoRoute><ListeStand1 /></ProtectedExpoRoute>} />
        <Route path='/updateStand/:id' element={<ProtectedExpoRoute><UpdateStand /></ProtectedExpoRoute>} />
        <Route path='/Gallerystand' element={<ProtectedExpoRoute> <Gallerystand />  </ProtectedExpoRoute>} />



        {/*user*/}
        <Route path='/createUser' element={<AddUser />} />
        <Route path='/listeUser' element={<ListeUsers />} />
        <Route path='/updateUser/:id' element={<UpdateUser />} />



        {/*invitation*/}
        <Route path='/createInvitation' element={<CreateInvitation />} />
        <Route path='/ListeInvitation' element={<ListeInvitation />} />
        <Route path='/updateInvitation/:id' element={<UpdateInvitation />} />
        <Route path='/invitation' element={<  InvitationForm />} />
        <Route path='/listeInvitation' element={< ListeInvitation />} />








        {/*paiement*/}
        <Route path='/payer/:eventId/:userId' element={<ProtectedExpoRoute>  <PaymentPage />  </ProtectedExpoRoute>} />
        <Route path='/ListeDePaiement' element={<ListePaiements />} />





        {/*reservation*/}
        <Route path='/createReservation' element={<CreateReservation />} />
        <Route path='/listeReservation' element={<ListeReservation />} />
        <Route path='/updateReservation/:id' element={<UpdateReservation />} />
        <Route path='/deleteReservation/:id' element={<DeleteReservation />} />


        {/* Foire*/}
        <Route path='/createFoire' element={<CreateFoire />} />
        <Route path='/listeFoire' element={<ListeFoire />} />
        <Route path='/updateFoiren/:id' element={<UpdateFoire />} />
        <Route path='/deleteFoire/:id' element={<DeleteFoire />} />
        <Route path='/vue' element={<Vue />} />





      </Routes>



    </>
  )
}

export default App

