import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../style/evenement/eventGallery.css";
import TopBarHome from '../visiteur/TopBarHome';

function EventGallery() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const token = localStorage.getItem('token');

  let config = token && {
    headers: {
      Authorization: `Bearer ${token.replace(/"/g, '')}`
      //bearer edsdsdsdsd.sdsdsdsdsdsd.sdsdsdsd
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/event/listeEvent', config);
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

  const isEventOngoing = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return now >= start && now <= end;
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
              className={`event-box ${isEventOngoing(event.date_debut, event.date_fin) ? 'ongoing' : ''}`}
              onClick={() => handleEventClick(event)}
            >
              <div className="event">
                <img src={event.image} alt="Event" />
                <div className="event-details">
                  <h3>{event.titre}</h3>
                  <p>Date de début: {new Date(event.date_debut).toLocaleDateString('fr-FR')}</p>
                  <p>Date de fin: {new Date(event.date_fin).toLocaleDateString('fr-FR')}</p>
                  <p>Description: {event.description}</p>
                  {isEventOngoing(event.date_debut, event.date_fin) ? (
                    <Link to={`/Gallerystand?event=${event._id}&eventName=${encodeURIComponent(event.titre)}&eventStartDate=${encodeURIComponent(event.date_debut)}&eventEndDate=${encodeURIComponent(event.date_fin)}`}>
                      <button className="button-ongoing">Voir les stands</button>
                    </Link>
                  ) : (
                    <button className="button-ended" disabled></button>
                  )}
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
