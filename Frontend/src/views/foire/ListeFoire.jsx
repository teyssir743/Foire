import  { useState, useEffect } from 'react';
import axios from 'axios';
import Dash from '../dash-bord/Dash';
import "../../style/foire/ListeFoire.css";
function ListeFoire() {
    const [foires, setFoires] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/foire/listeFoire')
            .then(response => {
                setFoires(response.data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching foires:', error);
                setError('Error fetching foires. Please try again later.');
                setLoading(false);
            });
    }, []);

    return (
        <Dash>
        <div>
            <h2>Liste des Foires</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {foires.map(foire => (
                        <li key={foire._id}>
                            <p>Nom: {foire.nom}</p>
                            <p>Lieu: {foire.lieu}</p>
                            <p>Date Début: {foire.dateDebut}</p>
                            <p>Date Fin: {foire.dateFin}</p>
                            <p>Description: {foire.description}</p>
                            <p>Organisateur: {foire.organisateur}</p>
                            <p>Statut: {foire.statut}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </Dash>
    );
}

export default ListeFoire;
