import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import "../../style/stand/listeStand.css";
import TopBarHome from '../visiteur/TopBarHome';

export default function ListeStand() {
    const [stands, setStands] = useState([]);
    const [selectedStand, setSelectedStand] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventId = searchParams.get('event');
    const eventName = searchParams.get('eventName');

    useEffect(() => {
        fetchStands();
    }, []);

    const fetchStands = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/stand/listeStand');
            if (response.data && response.data.data) {
                setStands(response.data.data);
            } else {
                console.error('Données de stand non disponibles dans la réponse :', response);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des stands :', error);
        }
    };

    const handleStandClick = (stand) => {
        setSelectedStand(stand);
    };

    return (
        <div className="container">
            <TopBarHome />
            <div className="stands-grid">
                {stands.map((stand, index) => (
                    <div
                        key={index}
                        className={clsx('stand', selectedStand && selectedStand.num === stand.num && 'selected')}
                        onClick={() => handleStandClick(stand)}
                    >
                        <span>{stand.num}</span>
                    </div>
                ))}
            </div>
            <div className="stand-details">
                {selectedStand && (
                    <div className="stand-details-content">
                        <h2>Stand Details</h2>
                        <p><strong>Nom:</strong> {selectedStand.nom}</p>
                        <p><strong>Numéro:</strong> {selectedStand.num}</p>
                        <p><strong>Emplacement:</strong> {selectedStand.emplacement}</p>
                        <p><strong>Taille:</strong> {selectedStand.taille}</p>
                        <p><strong>État:</strong> {selectedStand.etat}</p>
                        <p><strong>Prix de location:</strong> {selectedStand.prixLocation}</p>
                        {selectedStand.etat === 'disponible' && (
                            <Link to={`/createReservation?stand=${selectedStand.num}&event=${eventId}&eventName=${encodeURIComponent(eventName)}`}>
                                <button>Réserver maintenant</button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
