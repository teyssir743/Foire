import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBarHome from '../visiteur/TopBarHome';
import "../../style/réservation/CreateReservation.css";

import Footer from '../visiteur/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const today = new Date();

  const minStartDate = today > eventStartDate ? today : eventStartDate;

  const isValidDate = (date) => !isNaN(date.getTime());
  const [startDate, setStartDate] = useState(isValidDate(minStartDate) ? minStartDate : new Date());
  const [endDate, setEndDate] = useState(isValidDate(eventEndDate) ? eventEndDate : new Date());
  const [standNum, setStandNum] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (standId) {
      fetchStandDetails(standId);
    }
  }, [standId]);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let config = token && {
    headers: {
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    }
  };

  const fetchStandDetails = async (standId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stand/listeStand/${standId}`, config);
      if (response.data && response.data.data && response.data.data.num !== undefined) {
        setStandNum(response.data.data.num);
      } else {
        console.error('Numéro de stand non disponible dans la réponse :', response);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du stand :', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!startDate) {
      newErrors.startDate = "Ce champ est obligatoire";
    }
    if (!endDate) {
      newErrors.endDate = "Ce champ est obligatoire";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
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
    const user = JSON.parse(localStorage.getItem('userData'));

    try {
      const reservationData = {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        stand: standId,
        event: eventId,
        user: user._id
      };

      const response = await axios.post('http://localhost:5000/api/reservation/createReservation', reservationData, config);
      toast.success('Votre réservation a été enregistrée avec succès!');
      navigate(`/payer/${eventId}/${user._id}`);

    } catch (error) {
      console.error('Erreur lors de la réservation :', error);
      toast.error('Erreur lors de la réservation. Veuillez réessayer.');
    }
  };

  const errorStyle = {
    color: 'red',
    fontSize: '0.9em',
    marginTop: '5px'
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
              selected={startDate}
              className='date'
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={minStartDate}
              maxDate={eventEndDate}
              
            />
            {errors.startDate && <span style={errorStyle}>{errors.startDate}</span>}
            <label>Date de fin de réservation </label>
            <DatePicker
              className='date'
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={eventEndDate}
              
            />
            {errors.endDate && <span style={errorStyle}>{errors.endDate}</span>}
            <input className='date' type="text" value={`Stand sélectionné: Stand ${standNum}`} readOnly />
            <input className='date' type="text" value={`Événement sélectionné: ${eventName}`} readOnly />
            <button className='reserverb' type="submit">Réserver</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateReservation;
