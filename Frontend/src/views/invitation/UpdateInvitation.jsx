import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateInvitation() {
    const [invitation, setInvitation] = useState({
        invité: '',
        événement: '',
        statut: ''
    });
    const { id } = useParams();

    const token = localStorage.getItem('token');

    let config = token && {
        headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
    };
    

    useEffect(() => {
        handleGetInvitationData(id);
    }, []);

    const handleGetInvitationData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/invitation/listeInvitation/${id}`,config);
            setInvitation(result.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'invitation :", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvitation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateInvitation = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/invitation/updateInvitation/${id}`, invitation, config)
            .then(() => {
                toast.success("Invitation mise à jour avec succès");
                console.log('Mise à jour réussie', invitation);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de l'invitation :", error);
            });
    };

    return (
        <div>
            <ToastContainer />
            <h2>Mettre à jour l'invitation</h2>
            <form onSubmit={handleUpdateInvitation}>
                <label>Invité:</label>
                <input type="text" name="invité" value={invitation.invité} onChange={handleChange} />
                <br />

                <label>Événement:</label>
                <input type="text" name="événement" value={invitation.événement} onChange={handleChange} />
                <br />

                <label>Statut:</label>
                <select name="statut" value={invitation.statut} onChange={handleChange}>
                    <option value="en attente">En attente</option>
                    <option value="acceptée">Acceptée</option>
                    <option value="refusée">Refusée</option>
                </select>
                <br />

                <button type="submit">Mettre à jour l'invitation</button>
            </form>
        </div>
    );
}

export default UpdateInvitation;
