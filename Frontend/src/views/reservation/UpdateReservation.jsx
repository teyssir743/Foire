import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dash from '../dash-bord/Dash';

function ReservationForm() {
  const { id } = useParams();

  const [reservations, setReservations] = useState({
    _id: '',
    startDate: '',
    endDate: '',
    stand: '',
    event: '',
  });

  useEffect(() => {
    handleGetReservationData(id);
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const handleGetReservationData = async (id) => {
    try {
      const result = await axios.get(`http://localhost:5000/api/reservation/listeReservation/${id}`);
      setReservations(result.data.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de la réservation :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservations(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateReservation();
  };

  const handleUpdateReservation = () => {
    axios.put(`http://localhost:5000/api/reservation/updateReservation/${id}`, reservations)
      .then(() => {
        console.log('Mise à jour réussie');
        toast.success("Réservation mise à jour avec succès !");
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour de la réservation :", error);
      });
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '50px',
      border: '2px solid #FF007F',
      width: '400px',
      height: '530px',
    },
    label: {
      color: 'white',
      marginRight: '10px',
      marginTop: '10px',
    },
    input: {
      background: 'transparent',
      border: 'none',
      borderBottom: '2px solid #FF007F',
      width: '100%',
      padding: '8px',
      color: 'white',
      outline: 'none',
    },
    button: {
      width: '70%',
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: '#FF007F',
      color: 'white',
      cursor: 'pointer',
      border: 'none',
      marginTop: '20px',
    },
  };

  return (
    <Dash>
      <form onSubmit={handleSubmit} style={styles.container}>
        <label style={styles.label}>
          ID:
          <input type="text" name="_id" value={reservations._id} onChange={handleChange} style={styles.input} />
        </label>
        <label style={styles.label}>
          Start Date:
          <input type="datetime-local" name="startDate" value={formatDate(reservations.startDate)} onChange={handleChange} style={styles.input} />
        </label>
        <label style={styles.label}>
          End Date:
          <input type="datetime-local" name="endDate" value={formatDate(reservations.endDate)} onChange={(e) => setReservations({ ...reservations, endDate: e.target.value })} style={styles.input} />
        </label>
        <label style={styles.label}>
          Stand:
          <input type="text" name="stand" value={reservations.stand} onChange={handleChange} style={styles.input} />
        </label>
        <label style={styles.label}>
          Event:
          <input type="text" name="event" value={reservations.event} onChange={handleChange} style={styles.input} />
        </label>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      <ToastContainer />
    </Dash>
  );
}

export default ReservationForm;
