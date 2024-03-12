import React from 'react'
import { toast , ToastContainer} from 'react-toastify';

import { useState , useEffect} from 'react'
import axios from 'axios'
import "../../style/evenement/CreateEvent.css";



function Events() {

     
    const [event , setEvent]= useState(null)
    const createEvent =()=>{
    console.log(event)
      axios.post("http://localhost:5000/api/event/createEvent" , event)
      .then (()=>{toast.success("event ajouter avec sucess !")
    }).catch(()=>{toast.error('quelque chose va pas correctement ! ')})
    }
   
 


  return (
    <>
    {/*formulaire de event*/}
    <div className='event-form '>
      <ToastContainer/>

      <h1 className="create-event-title" >create event</h1>

        <label>Titre:</label>
        <br/>
        <input type="text" name="" id="" onChange={e =>setEvent({...event,titre:e.target.value})} />
        <br/>

        <label>Date_debut:</label>
        <div className="date-input-container">
        <i className="fa fa-calendar" aria-hidden="true" />
        <input className="event-form-input date-input" type="Date" name="" id="" onChange={e =>setEvent({...event,date_debut:e.target.value})} />
        </div>
        <br/>
    
        <label>Date_fin:</label>
        <div className="date-input-container">
        <i className="fa fa-calendar" aria-hidden="true" />
        <input className="event-form-input date-input" type="Date" name="" id=""  onChange={e =>setEvent({...event,date_fin:e.target.value})}/>
       
        </div> <br/>
       

        <label>description:</label>
        <input type="text" name="" id=""   onChange={e =>setEvent({...event,description:e.target.value})}  />
        <br/>

       <button  onClick={createEvent}type="submit">Enregistrer</button>
    </div>

    


    </>

 )}

export default Events