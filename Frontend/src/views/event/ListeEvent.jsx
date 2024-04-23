import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../util/DateConvertor';
import "../../style/evenement/ListeEvent.css";
import { toast , ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ListeEvent() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/event/listeEvent")
      .then(res => {
        setEvents(res.data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des événements :", error);
      });
  }, []);

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/event/deleteEvent/${id}`)
      .then(() => {
        toast.warn('Event supprimé');
        setEvents(events.filter(event => event._id !== id)); // Mettre à jour la liste des événements après la suppression
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'événement :", error);
      });
  };

  return (
    <div className="event-list-container">
      <ToastContainer/>
      <h1 className="event-list-title">Liste des événements</h1>
      
      <button className="button-create-event" onClick={() => navigate(`/createEvent`)}>Créer un événement</button>
      
      <br/>
      <table className="event-list-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event._id}>
              <td>{event.titre}</td>
              <td>{formatDate(event.date_debut)}</td>
              <td>{formatDate(event.date_fin)}</td>
              <td>{event.description}</td>
              <td>
                <button className="button" onClick={() => navigate(`/updateEvent/${event._id}`)}>Modifier</button>
                <button className="button" onClick={() => handleDelete(event._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
}

export default ListeEvent;
