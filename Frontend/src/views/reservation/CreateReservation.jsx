import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../../style/réservation/CreateReservation.css";
import axios from 'axios';

// Chemin vers votre image locale ou URL de l'image en ligne

function CreateReservation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(null);
  const [stand, setStand] = useState('');
  const [event, setEvent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logique pour soumettre le formulaire de réservation
    const reservationData = {
      name,
      email,
      phone,
      date,
      stand,
      event,
    };

    try {
      // Envoyer les données de réservation à votre API
      const response = await axios.post('/api/reservation/createReservation', reservationData);
      console.log('Réservation créée avec succès :', response.data);
      
      // Réinitialiser les champs de formulaire après soumission
      setName('');
      setEmail('');
      setPhone('');
      setDate(null);
      setStand('');
      setEvent('');
    } catch (error) {
      console.error('Erreur lors de la création de la réservation :', error);
    }
  };

  return (
    <div className="reservation-container">
      <img src="" alt="Image de réservation" className="reservation-image" />
      <form onSubmit={handleSubmit} className="reservation-form">
        <div>
          <label>Nom:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Téléphone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Date de réservation:</label>
          <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" required />
        </div>
        <div>
          <label>Stand:</label>
          <select value={stand} onChange={(e) => setStand(e.target.value)} required>
            {/* Options de stand */}
            <option value="">Sélectionner un stand</option>
            <option value="Stand A">Stand A</option>
            <option value="Stand B">Stand B</option>
            <option value="Stand C">Stand C</option>
            {/* Ajoutez d'autres options de stand ici */}
          </select>
        </div>
        <div>
          <label>Événement:</label>
          <select value={event} onChange={(e) => setEvent(e.target.value)} required>
            {/* Options d'événement */}
            <option value="">Sélectionner un événement</option>
            <option value="Événement 1">Événement 1</option>
            <option value="Événement 2">Événement 2</option>
            <option value="Événement 3">Événement 3</option>
            {/* Ajoutez d'autres options d'événement ici */}
          </select>
        </div>
        <button type="submit">Réservé</button>
      </form>
    </div>
  );
}

export default CreateReservation;