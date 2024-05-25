import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../style/evenement/eventGallery.css";
import TopBarHome from '../visiteur/TopBarHome';

function EventGallery() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Ajout de useState pour gérer la sélection de l'événement

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/event/listeEvent');
      if (response.data && response.data.data) {
        setEvents(response.data.data);
      } else {
        console.error('Données d\'événement non disponibles dans la réponse :', response);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des événements :', error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <TopBarHome />
      <div className="event-gallery">
        <h2>Liste des événements</h2>
        <div className="event-boxes">
          {events.map(event => (
            <div
              key={event._id}
              className="event-box"
              onClick={() => handleEventClick(event)}
            >
              <div className="event">
                <img src={event.image} alt="Event" />
                <div className="event-details">
                  <h3>{event.titre}</h3>
                  <p>Date de début: {event.date_debut}</p>
                  <p>Date de fin: {event.date_fin}</p>
                  <p>Description: {event.description}</p>
                  <Link to={`/Gallerystand?event=${event._id}&eventName=${encodeURIComponent(event.titre)}&eventStartDate=${encodeURIComponent(event.date_debut)}&eventEndDate=${encodeURIComponent(event.date_fin)}`}>
                    <button>Voir les stands</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventGallery;
