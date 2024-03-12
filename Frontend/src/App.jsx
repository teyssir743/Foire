
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import {Route,Routes} from 'react-router-dom'

import Home from './components/Home'
import Register from './views/authentification/Register'
import Login from './views/authentification/Login'

import Dashbord from './views/Dashbord/Dashbord';


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







function App() {

  return (
    <>
      

      <Routes>
     
        <Route path='/' element={ <Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
     
        
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

      </Routes>



    </>
  )
}

export default App

