import "../../style/standvirtuel/stands.css";
import React, { useState } from 'react';
import clsx from 'clsx';

const foires = [
  {
    name: 'Festival de la musique',
    price: 100,
    occupied: [20, 21, 30, 1, 2, 8],
  },
  {
    name: 'Salon de l\'artisanat',
    price: 120,
    occupied: [9, 41, 35, 11, 65, 26],
  },
  {
    name: 'Expo technologique',
    price: 80,
    occupied: [37, 25, 44, 13, 2, 3],
  },
  {
    name: 'Marché de Noël',
    price: 90,
    
  },
];

const stands = Array.from({ length: 8 * 8 }, (_, i) => i);

export default function App() {
    const [selectedFoire, setSelectedFoire] = useState(foires[0]);
    const [selectedStands, setSelectedStands] = useState([]);
    const [standDetails, setStandDetails] = useState(null);

    return (
        <div className="container">
            <div className="left-section">
                <Foire
                    foire={selectedFoire}
                    selectedStands={selectedStands}
                    onSelectedStandsChange={setSelectedStands}
                    onStandDetailsChange={setStandDetails}
                />
            </div>
            <div className="right-section">
                <StandDetails standDetails={standDetails} />
            </div>
        </div>
    );
}

function Foire({ foire, selectedStands, onSelectedStandsChange, onStandDetailsChange }) {
    function handleSelectedStand(stand) {
        const isSelected = selectedStands.includes(stand);
        if (isSelected) {
            onSelectedStandsChange(selectedStands.filter(selectedStand => selectedStand !== stand));
            onStandDetailsChange(null);
        } else {
            onSelectedStandsChange([...selectedStands, stand]);

            // Mettre à jour les détails du stand sélectionné
            const standDetails = {
                standNumber: stand + 1,
                price: foire.price,
                superficie: '100 m²',
            };
            onStandDetailsChange(standDetails);
        }
    }

    return (
        <div className="Foire">
            <div className="stands">
                {stands.map((stand, index) => {
                    const isSelected = selectedStands.includes(stand);
                    const isOccupied = foire.occupied.includes(stand);
                    return (
                        <span
                            key={index}
                            className={clsx(
                                'stand',
                                isSelected && 'selected',
                                isOccupied && 'occupied'
                            )}
                            onClick={isOccupied ? null : () => handleSelectedStand(stand)}
                            tabIndex="0"
                            onKeyPress={
                                isOccupied ? null : e => {
                                    if (e.key === 'Enter') {
                                        handleSelectedStand(stand);
                                    }
                                }
                            }>
                            {stand + 1}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

function StandDetails({ standDetails }) {
    if (!standDetails) {
        return (
            <div className="stand-details-form">
                <h3>Informations du stand</h3>
                <p>Sélectionnez un stand pour voir les détails ici.</p>
            </div>
        );
    }

    return (
        <div className="stand-details-form">
            <h3>Détails du stand sélectionné</h3>
            <p>Numéro du stand : {standDetails.standNumber}</p>
            <p>Prix : {standDetails.price}$</p>
            <p>Superficie : {standDetails.superficie}</p>
        </div>
    );
}
