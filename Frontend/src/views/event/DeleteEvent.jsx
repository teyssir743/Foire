import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../util/DateConvertor';
import "../../style/evenement/DeleteEvent.css";

function DeleteEvent() {
  const {id} = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/event/listeEvent/${id}`)
      .then(res => {
        setEvent(res.data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'événement :", error);
      });
  }, [id]);



  const deleteEvent = () => {
    axios.delete(`http://localhost:5000/api/event/deleteEvent/${id}`)
      .then(res => {
        console.log("événement supprimé :", res.data);
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'événement :", error);
      });
  }



  return (
    <div className="delete-event-container">
      <h1 className="delete-event-title">Supprimer l'événement</h1>
      <p className="delete-event-description">
        Êtes-vous sûr de vouloir supprimer l'événement suivant ?
      </p>
      <ul className="delete-event-details">
        <li>Titre: {event.titre}</li>
        <li>Date de début: {formatDate(event.date_debut)}</li>
        <li>Date de fin:{formatDate(event.date_fin)}</li>
        <li>Description:{event.description}</li>
      </ul>
      <button className="delete-event-button" onClick={deleteEvent} type="button">Supprimer</button>
    </div>
  );
}

export default DeleteEvent;