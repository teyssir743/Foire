import React from 'react';
import axios from 'axios';

function DeleteReservation({ reservationId }) {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/reservation/deleteReservation/${reservationId}`);
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
