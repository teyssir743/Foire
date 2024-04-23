import React, { useState } from 'react';
import axios from 'axios';

function UpdateReservation({ reservationId }) {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/reservation/updateReservation/${reservationId}`, {
                status
            });
            console.log('Reservation updated successfully!');
        } catch (error) {
            console.error('Error updating reservation:', error);
        }
    };

    return (
        <div>
            <h2>Update Reservation</h2>
            <form onSubmit={handleSubmit}>
                {/* Input field for status */}
                <button type="submit">Update Reservation</button>
            </form>
        </div>
    );
}

export default UpdateReservation;
