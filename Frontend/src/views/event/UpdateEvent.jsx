import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Dash from '../dash-bord/Dash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateEvent() {
  const [events, setEvent] = useState({ titre: '', date_debut: '', date_fin: '', description: '' });
  const { id } = useParams();

  useEffect(() => {
    handleGetEventData(id);
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const handleGetEventData = async (id) => {
    try {
      const result = await axios.get(`http://localhost:5000/api/event/listeEvent/${id}`, events);
      setEvent(result.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'événement :", error);
    }
  };

  const handleUpdateEvent = () => {
    axios.put(`http://localhost:5000/api/event/updateEvent/${id}`, events)
      .then(() => {
        console.log('Mise à jour réussie');
        toast.success("Événement mis à jour avec succès !");
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour de l'événement :", error);
      });
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    registerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: '20px',
      border: '2px solid #FF007F',
      borderRadius: '8px',
      marginTop: '50px',
      width: '400px',
      marginLeft: '350px',
    },
    welcomeSection: {
      textAlign: 'center',
      color: 'white',
    },
    formSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
    },
    inputContainer: {
      marginBottom: '10px',
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
        <div style={styles.registerContainer}>
          <h1 style={styles.welcomeSection}>Modifier l'événement</h1>
          <form style={styles.formSection}>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>Titre:</label>
              <input
                style={styles.formInput}
                type="text"
                value={events.titre}
                onChange={(e) => setEvent({ ...events, titre: e.target.value })}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel} htmlFor="ID_Date_debut">Date de début:</label>
              <input
                style={styles.formInput}
                type="date"
                value={formatDate(events.date_debut)}
                onChange={(e) => setEvent({ ...events, date_debut: e.target.value })}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel} htmlFor="ID_Date_fin">Date de fin:</label>
              <input
                style={styles.formInput}
                type="date"
                value={formatDate(events.date_fin)}
                onChange={(e) => setEvent({ ...events, date_fin: e.target.value })}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel} htmlFor="ID_description">Description:</label>
              <textarea
                style={styles.formTextarea}
                value={events.description}
                onChange={(e) => setEvent({ ...events, description: e.target.value })}
              ></textarea>
            </div>
            <button style={styles.formButton} onClick={handleUpdateEvent} type="button">Mettre à jour</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Dash>
  );
}

export default UpdateEvent;
