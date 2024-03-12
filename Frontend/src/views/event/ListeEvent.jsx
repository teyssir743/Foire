import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../util/DateConvertor';
import "../../style/evenement/ListeEvent.css";
import { toast , ToastContainer} from 'react-toastify';

import {useNavigate}from 'react-router-dom'



function ListeEvent() {
  
  const [events, setEvents] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/api/event/listeEvent")
      .then(res => {
        setEvents(res.data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des événements :", error);
      });
  }, []);


  const handleDelete = id => {axios.delete(`http://localhost:5000/api/event/deleteEvent/${id}`)
  .then(()=>{toast.warn('event supprimer')})}


  return (
    <div className="event-list-container">
      <ToastContainer/>
      <h1 className="event-list-title">Liste des événements</h1>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-list__item">
            <div className="event-list__item-details">
              <div className="event-list__item-property">
                <strong>Titre:</strong> {event.titre}
              </div>
              <div className="event-list__item-property">
                <strong>Date de début:</strong> {formatDate(event.date_debut)}
              </div>
              <div className="event-list__item-property">
                <strong>Date de fin:</strong> {formatDate(event.date_fin)}
              </div>
              <div className="event-list__item-property">
                <strong>Description:</strong> {event.description}
              </div>
            </div>
            <button  className="button"onClick={()=>navigate(`/updateEvent/${event._id}`)}>Update</button>
            <button  className="button" onClick={()=>handleDelete(event._id)}>delete</button> 
          
          </li>
          
        ))}
        
      </ul>

   

    </div>
  );
}

export default ListeEvent;