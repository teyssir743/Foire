import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListeInvitation() {
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/invitation/listeInvitation");
                setInvitations(response.data.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des invitations :", error);
            }
        };
        fetchInvitations();
    }, []);

    const handleDeleteInvitation = async (invitationId) => {
        try {
            await axios.delete(`http://localhost:5000/api/invitation/deleteInvitation/${invitationId}`);
            setInvitations(invitations.filter(invitation => invitation._id !== invitationId));
            console.log("Invitation supprimée avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression de l'invitation :", error);
        }
    };

    return (
        <div>
            <h2>Liste des invitations</h2>
            <ul>
                {invitations.map(invitation => (
                    <li key={invitation._id}>
                        <p>Message : {invitation.invitationMessage}</p>
                        <p>Date d'envoi : {invitation.sentDate}</p>
                        <button onClick={() => handleDeleteInvitation(invitation._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListeInvitation;
