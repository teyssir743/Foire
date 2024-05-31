import  { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "../../style/evenement/CreateEvent.css";
import Dash from '../dash-bord/Dash';

function Events() {
  const [event, setEvent] = useState({
    titre: '',
    date_debut: '',
    date_fin: '',
    etat: '',
    description: '',
    image: null // State pour l'image sélectionnée
  });

 const token = localStorage.getItem('token');

    let config = token && {
      headers: {
        Authorization: `Bearer ${token.replace(/"/g, '')}`
      }
    };
  


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

    axios.post("http://localhost:5000/api/event/createEvent", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }, config
    })
    .then (() => {
      toast.success("Événement ajouté avec succès !");
    })
    .catch(() => {
      toast.error('Quelque chose ne va pas correctement !');
    });
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    createEventContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: '20px',
      border: '2px solid #FF007F',
      borderRadius: '8px',
      marginTop: '30px',
      marginLeft: '350px',
      width: '80%',
      maxWidth: '600px',
    },
    formSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
      width: '100%',
    },
    inputContainer: {
      marginBottom: '10px',
      width: '100%',
    },
    formInput: {
      background: 'transparent',
      border: 'none',
      borderBottom: '2px solid #FF007F',
      width: '100%',
      padding: '8px',
      color: 'white',
      marginBottom: '10px',
      outline: 'none',
    },
    formTextarea: {
      background: 'transparent',
      border: 'none',
      borderBottom: '2px solid #FF007F',
      width: '100%',
      padding: '8px',
      color: 'white',
      marginBottom: '10px',
      outline: 'none',
    },
    formLabel: {
      marginBottom: '5px',
      color: 'white',
    },
    formButton: {
      width: '40%',
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: '#FF007F',
      color: 'white',
      cursor: 'pointer',
    },
  };

  return (
    <Dash>
      <div style={styles.container}>
        <div style={styles.createEventContainer}>
          <h1 className="create-event-title" style={{color:'white'}}>Créer un événement</h1>
          <ToastContainer />
          <form style={styles.formSection}>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>Titre:</label>
              <input
                style={styles.formInput}
                type="text"
                name="titre"
                value={event.titre}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>Date de début:</label>
              <input
                style={styles.formInput}
                type="date"
                name="date_debut"
                value={event.date_debut}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>Date de fin:</label>
              <input
                style={styles.formInput}
                type="date"
                name="date_fin"
                value={event.date_fin}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>Description:</label>
              <textarea
                style={styles.formTextarea}
                value={event.description}
                name="description"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button
              style={styles.formButton}
              onClick={createEvent}
              type="button"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </Dash>
  );
}

export default Events;
