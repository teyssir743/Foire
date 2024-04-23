import  { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "../../style/evenement/CreateEvent.css";

function Events() {
  const [event, setEvent] = useState({
    titre: '',
    date_debut: '',
    date_fin: '',
    description: '',
    image: null // State pour l'image sélectionnée
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleImageChange = (e) => {
    setEvent({ ...event, image: e.target.files[0] }); // Stocker le fichier image sélectionné dans le state
  };

  const createEvent = () => {
    const formData = new FormData();
    formData.append('titre', event.titre);
    formData.append('date_debut', event.date_debut);
    formData.append('date_fin', event.date_fin);
    formData.append('description', event.description);
    formData.append('image', event.image); // Ajouter l'image au formData

    console.log(event)
<<<<<<< HEAD
    axios.post("http://localhost:5000/api/event/createEvent" , event , { headers: {
      'Content-Type': 'multipart/form-data',
  },})
    .then (()=>{toast.success("event ajouter avec sucess !")
  }).catch(()=>{toast.error('quelque chose va pas correctement ! ')})
  }
 


  return (
    <>
      {/* formulaire de event */}
      <div className='event-form'>
        <ToastContainer />
=======
      axios.post("http://localhost:5000/api/event/createEvent" , event)
      .then (()=>{toast.success("event ajouter avec sucess !")
    }).catch(()=>{toast.error('quelque chose va pas correctement ! ')})
    }

  return (
    <>
    {/*formulaire de event*/}
    <div className='event-form '> 
      <ToastContainer/>
>>>>>>> 736bac2bf75510471ef1a1174675d3e2079fafe4

        <h1 className="create-event-title">Créer un événement</h1>

        <label className='titre'>Titre:</label>
        <input type="text" name="titre" value={event.titre} onChange={handleInputChange} />
        <br />

        <label>Date_debut:</label>
        <div className="date-input-container">
          <i className="fa fa-calendar" aria-hidden="true" />
          <input className="event-form-input date-input" type="Date" name="date_debut" value={event.date_debut} onChange={handleInputChange} />
        </div>
      

        <label>Date_fin:</label>
        <div className="date-input-container">
          <i className="fa fa-calendar" aria-hidden="true" />
          <input className="event-form-input date-input" type="Date" name="date_fin" value={event.date_fin} onChange={handleInputChange} />
        </div> 

<<<<<<< HEAD
        <label>Description:</label>
        <input type="text" name="description" value={event.description} onChange={handleInputChange} />
        <br />

        {/* Champ de téléchargement d'image */}
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />

        <button className="button-event" onClick={createEvent} type="button">Enregistrer</button>
      </div>
=======
        <label>description:</label>
        <input type="text" name="" id=""   onChange={e =>setEvent({...event,description:e.target.value})}  />
        <br/>

       <button  onClick={createEvent}type="submit">Enregistrer</button>
    </div>

>>>>>>> 736bac2bf75510471ef1a1174675d3e2079fafe4
    </>
  );
}

export default Events;
