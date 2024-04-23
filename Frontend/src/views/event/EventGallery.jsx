import  { useState, useEffect } from 'react';
import axios from 'axios';
import "../../style/evenement/eventGallery.css";
import TopBarHome from '../visiteur/TopBarHome';

function EventGallery() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/event/listeEvent")
      .then(res => {
        setEvents(res.data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des événements :", error);
      });
  }, []);

  return (
    <div> 
       <TopBarHome/>
    <div className="event-gallery">
      <h2>Liste des événements</h2>
      <div className="event-boxes">
        {events.map(event => (
          <div className="event-box" key={event._id}>
            <div className="event">
              <img src={event.image} alt="Event" />
              <div className="event-details">
                <h3>{event.titre}</h3>
                <p>Date de début: {event.date_debut}</p>
                <p>Date de fin: {event.date_fin}</p>
                <p>Description: {event.description}</p>
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
