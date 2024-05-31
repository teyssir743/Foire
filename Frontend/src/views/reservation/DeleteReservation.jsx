import React from 'react';
import axios from 'axios';

function DeleteReservation({ reservationId }) {
    const token = localStorage.getItem('token');

    let config = token && {
        headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/reservation/deleteReservation/${reservationId}`,config);
            console.log('Reservation deleted successfully!');
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Reservation</button>
        </div>
    );
}

export default DeleteReservation;
