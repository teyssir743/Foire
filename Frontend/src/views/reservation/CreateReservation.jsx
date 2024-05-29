import { useState, useEffect } from 'react';
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
  const standId = searchParams.get('stand');
  const eventId = searchParams.get('event');
  const eventName = decodeURIComponent(searchParams.get('eventName'));
  const eventStartDateStr = decodeURIComponent(searchParams.get('eventStartDate'));
  const eventEndDateStr = decodeURIComponent(searchParams.get('eventEndDate'));

  const eventStartDate = new Date(eventStartDateStr);
  const eventEndDate = new Date(eventEndDateStr);
  const today = new Date(); // Obtenez la date actuelle

  // Calculer la date minimale pour la réservation
  const minStartDate = today > eventStartDate ? today : eventStartDate; // La date minimale est soit la date actuelle soit la date de début de l'événement, selon celle qui est la plus tardive

  const isValidDate = (date) => !isNaN(date.getTime());
  const [startDate, setStartDate] = useState(isValidDate(minStartDate) ? minStartDate : new Date());
  const [endDate, setEndDate] = useState(isValidDate(eventEndDate) ? eventEndDate : new Date());
  const [standNum, setStandNum] = useState('');

  useEffect(() => {
    if (standId) {
      fetchStandDetails(standId);
    }
  }, [standId]);

  const fetchStandDetails = async (standId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stand/listeStand/${standId}`);
      console.log('Réponse de l\'API pour les détails du stand :', response); // Debug
      if (response.data && response.data.data && response.data.data.num !== undefined) {
        setStandNum(response.data.data.num);
      } else {
        console.error('Numéro de stand non disponible dans la réponse :', response);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du stand :', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !standId || !eventId) {
      toast.error('Veuillez remplir tous les champs requis.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const eventStart = new Date(eventStartDate);
    const eventEnd = new Date(eventEndDate);

    if (start < eventStart || end > eventEnd) {
      toast.error('Les dates de réservation doivent être dans la plage des dates de l\'événement.');
      return;
    }

    try {
      const reservationData = {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        stand: standId,
        event: eventId
      };

      console.log('Données envoyées pour la réservation :', reservationData);

      const response = await axios.post('http://localhost:5000/api/reservation/createReservation', reservationData);

      console.log('Réponse de la requête de réservation :', response);
      toast.success('Votre réservation a été enregistrée avec succès!');

    } catch (error) {
      console.error('Erreur lors de la réservation :', error);
      toast.error('Erreur lors de la réservation. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <TopBarHome />
     
      <div className="container-reservation">
        <ToastContainer />
        <div className="form-container-res">
          <form onSubmit={handleSubmit} className="form">
            <h2>Réserver un stand !</h2>
            <label>Date de début de réservation </label>
            <DatePicker
              selected={startDate} className='date'
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={minStartDate} // Définir la date minimale comme étant minStartDate
              maxDate={eventEndDate}
              required
            />
            <label>Date de fin de réservation </label>
            <DatePicker className='date'
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={eventEndDate}
              required
            />
            <input className='date' type="text" value={`Stand sélectionné: Stand ${standNum}`} readOnly />
            <input className='date' type="text" value={`Événement sélectionné: ${eventName}`} readOnly />
            <button className='reserverb' type="submit">Réserver</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default CreateReservation;