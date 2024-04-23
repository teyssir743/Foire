import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListReservation() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/reservation/listeReservation')
            .then(response => {
                setReservations(response.data);
            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
            });
    }, []);

    return (
        <div>
            <h2>List Reservations</h2>
            {/* Display reservation list */}
        </div>
    );
}

export default ListReservation;
