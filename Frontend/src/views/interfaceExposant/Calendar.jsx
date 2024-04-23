import React, { useState, useEffect } from 'react';
import "../../style/interfaceExposant/Calendar.css";
import axios from 'axios';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [availability, setAvailability] = useState(null);

    // Fonction qui calcule le nombre de jours dans un mois
    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Noms des mois
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Calcule le premier jour du mois
    const firstDayOfMonth = () => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    // Gère le changement de mois précédent
    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };

    // Gère le changement de mois suivant
    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    // Fonction pour gérer le clic sur une date
    const handleDateClick = async (day) => {
        const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
        setSelectedDate(selectedDate);

        // Vérifier la disponibilité pour la date sélectionnée
        await checkAvailability(selectedDate);
    };

    // Fonction pour vérifier la disponibilité pour la date sélectionnée
    const checkAvailability = async (selectedDate) => {
        try {
            const response = await axios.get(`/api/stands/availability`, {
                params: {
                    date: selectedDate.toISOString().split('T')[0] // Envoyer la date au format YYYY-MM-DD
                }
            });

            // Mettre à jour l'état de disponibilité
            setAvailability(response.data);
        } catch (error) {
            console.error('Erreur lors de la vérification de la disponibilité des stands:', error);
        }
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>Prev</button>
                <h2>{monthNames[date.getMonth()]} {date.getFullYear()}</h2>
                <button onClick={handleNextMonth}>Next</button>
            </div>
            <div className="calendar-body">
                <table>
                    <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(Math.ceil((daysInMonth(date.getMonth(), date.getFullYear()) + firstDayOfMonth()) / 7))].map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {[...Array(7)].map((_, colIndex) => {
                                    const day = rowIndex * 7 + colIndex - firstDayOfMonth() + 1;
                                    const isCurrentMonth = day > 0 && day <= daysInMonth(date.getMonth(), date.getFullYear());
                                    const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === date.getMonth() && selectedDate.getFullYear() === date.getFullYear();
                                    
                                    return (
                                        <td
                                            key={colIndex}
                                            className={isCurrentMonth ? 'current-month' : 'other-month'}
                                            onClick={() => isCurrentMonth && handleDateClick(day)}
                                        >
                                            {isCurrentMonth && (
                                                <>
                                                    <span>{day}</span>
                                                    {isSelected && <span className="selected-marker">✔</span>}
                                                </>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Afficher la disponibilité des stands */}
            {selectedDate && (
                <div>
                    <h3>Disponibilité des stands à la date sélectionnée:</h3>
                    {availability ? (
                        availability.isAvailable ? (
                            <p>Les stands sont disponibles.</p>
                        ) : (
                            <p>Aucun stand disponible.</p>
                        )
                    ) : (
                        <p>Vérification en cours...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;
