import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Foire() {
    const [foires, setFoires] = useState([]);

    // Charger les foires depuis le backend
    useEffect(() => {
        axios.get('http://localhost:3001/foires')
            .then(response => {
                setFoires(response.data);
            })
            .catch(error => {
                console.error('Error fetching foires:', error);
            });
    }, []);

    return (
        <div>
            <h2>Liste des Foires</h2>
            <ul>
                {foires.map((foire, index) => (
                    <li key={index}>
                        <h3>{foire.nom}</h3>
                        <p>Lieu: {foire.lieu}</p>
                        <p>Date de début: {new Date(foire.dateDebut).toLocaleDateString()}</p>
                        <p>Date de fin: {new Date(foire.dateFin).toLocaleDateString()}</p>
                        <p>Description: {foire.description}</p>
                        <p>Organisateur: {foire.organisateur}</p>
                        <p>Statut: {foire.statut}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Foire;
