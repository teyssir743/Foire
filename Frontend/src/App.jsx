
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import {Route,Routes} from 'react-router-dom'

import Home from './components/Home'
import Register from './views/authentification/Register'
import Login from './views/authentification/Login'

import Dashbord from './views/Dashbord/Dashbord';
import Calendar  from './views/interfaceExposant/Calendar';
import Stands from './views//standvirtuel/stands';
import AddUser from './views/user/AddUser'
import UpdateUser from './views/user/UpdateUser'
import ListeUsers from './views/user/ListeUsers'

import CreateEvent from './views/event/CreateEvent'
import ListeEvent from './views/event/ListeEvent'
import UpdateEvent from './views/event/UpdateEvent'
import DeleteEvent from './views/event/DeleteEvent'

import CreateStand from './views/stand/CreateStand';
import ListeStand from './views/stand/ListeStand';
import UpdateStand from './views/stand/UpdateStand';

import CreateInvitation from'./views/invitation/CreateInvitation';
import ListeInvitation from './views/invitation/ListeInvitation';
import UpdateInvitation from './views/invitation/UpdateInvitation';

import CreateReservation from './views/reservation/CreateReservation';
import ListeReservation from './views/reservation/ListeReservation';
import UpdateReservation from './views/reservation/UpdateReservation';
import DeleteReservation from './views/reservation/DeleteReservation';



import UpdateFoire from "./views/foire/UpdateFoire";
import CreateFoire from './views/foire/CreateFoire';
import ListeFoire from './views/foire/ListeFoire';
import DeleteFoire from './views/foire/DeleteFoire';



function App() {

  return (
    <>
      

      <Routes>
     
        <Route path='/' element={ <Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
     <Route path='/Calendar' element={<Calendar/>}/>

        <Route path='/createEvent' element={ <CreateEvent/>}/>  
        <Route path='/listeEvent' element={ <ListeEvent/>}/>  
        <Route path='/updateEvent/:id' element={ <UpdateEvent/>}/>  
        <Route path='/deleteEvent' element={ <DeleteEvent/>}/>  
        

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
        <Route path='/createReservation' element={<CreateReservation/>}/>
        <Route path='/listeReservation' element={<ListeReservation/>}/>
        <Route path='/updateReservation/:id' element={<UpdateReservation/>}/>
        <Route path='/deleteReservation/:id' element={<DeleteReservation/>}/>

        <Route path='/createFoire' element={<CreateFoire/>}/>
        <Route path='/listeFoire' element={<ListeFoire/>}/>
        <Route path='/updateFoiren/:id' element={<UpdateFoire/>}/>
        <Route path='/deleteFoire/:id' element={<DeleteFoire/>}/>

        <Route path='/stand' element={<Stands/>}/>
      
      
      
      </Routes>



    </>
  )
}

export default App

