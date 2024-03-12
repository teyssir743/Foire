import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast , ToastContainer} from 'react-toastify';


function ListeInvitation() {
    const [invitations, setInvitations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/invitation/listeInvitation")
            .then(res => {
                setInvitations(res.data.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des stands :", error);
            });
    }, []);

    const handleInputChange = (e,invitationId) => {
        const { name, value } = e.target;
        setInvitations(prevState => ({
            ...prevState,
            [standId]: {
                ...prevState[invitationId],
                [name]: value
            }
        }));
    };


    const handleDelete = (invitationId) => {
        axios.delete(`http://localhost:5000/api/invitation/deleteInvitation/${invitationId}`)
            .then(() => {
                toast.warn('invitation supprimé');
                console.log('invitation supprimé avec succès');
            })
            .catch(error => {
                console.error("Erreur lors de la suppression du invitation :", error);
            });
    };

  

   
       
  return (
    <div>
        <ToastContainer/>
    <h2>Liste des invitations</h2>
    <ul>
        {invitations.map(invitation => (
            <li key={invitation._id}>
                <p>Invité : {invitation.invité}</p>
                <p>Événement : {invitation.événement}</p>
                <p>Statut : {invitation.statut}</p>
                <p>Date de création : {invitation.dateCréation}</p>

                <div  >
                        <button className="button" onClick={() => navigate(`/updateInvitation/${invitation._id}`)}>Update</button>
                        <button className="button" onClick={() => handleDelete(invitation._id)}>Delete</button>
                        </div>
            </li>
        ))}
    </ul>
</div>
  );
}

export default ListeInvitation