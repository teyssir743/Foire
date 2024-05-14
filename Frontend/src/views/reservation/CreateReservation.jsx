import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../style/réservation/CreateReservation.css";
import TopBarHome from '../visiteur/TopBarHome';
import Footer from '../visiteur/Footer';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useLocation } from 'react-router-dom';

function CreateReservation() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedStandNum = searchParams.get('stand');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [stands, setStands] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedStand, setSelectedStand] = useState(selectedStandNum || '');
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    fetchStands();
    fetchEvents();
  }, []);

  const fetchStands = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stand/listeStand');
      if (response.data && response.data.data) {
        setStands(response.data.data);
      } else {
        console.error('Données de stand non disponibles dans la réponse :', response);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des stands :', error);
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'phone') setPhone(value);
    else if (name === 'selectedEvent') setSelectedEvent(value); // Mettre à jour selectedEvent lorsqu'un événement est sélectionné
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/reservation/createReservation', {
            name,
            email,
            phone,
            date,
            selectedStand // Utilisez le nom correct de l'attribut
        });
       
        if (response.data.data) {
            toast.success('Votre réservation a été enregistrée avec succès!');
        } else {
            toast.error('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
        }
    } catch (error) {
        toast.error('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
    }
};


  return (
    <div>
      <TopBarHome />
      <div className="container">
        <div className="flex-container">
         
          <div className="form-container">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="form">
              <h2>Réserver un stand !</h2>
              <input type="text" name="name" value={name} onChange={handleChange} placeholder="Nom" required />
              <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required />
              <input type="tel" name="phone" value={phone} onChange={handleChange} placeholder="Téléphone" required />
              <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" required />
              <select value={selectedStand} onChange={(e) => setSelectedStand(e.target.value)} required>
                <option value="">Sélectionner un stand</option>
                {stands.map((stand, index) => (
                  <option key={index} value={stand.num}>Stand {stand.num}</option>
                ))}
              </select>
            
              <button type="submit">Réserver</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateReservation;
