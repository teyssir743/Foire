// InvitationForm.jsx

import  { useState } from 'react';
import axios from 'axios';

function InvitationForm() {
  const [senderName, setSenderName] = useState('');
  const [invitationMessage, setInvitationMessage] = useState('');

  const handleSenderNameChange = (e) => {
    setSenderName(e.target.value);
  };

  const handleInvitationMessageChange = (e) => {
    setInvitationMessage(e.target.value);
  };

  const sendInvitations = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/invitation/createInvitation', {
        senderName,
        invitationMessage
      });
      console.log(response.data);
      // Ajouter une logique pour gérer la réponse, par exemple afficher un message de succès
    } catch (error) {
      console.error('Erreur lors de l\'envoi des invitations :', error);
      // Ajouter une logique pour gérer les erreurs, par exemple afficher une alerte
    }
  };

  return (
    <div>
      <h2>Envoyer des invitations</h2>
      <label htmlFor="senderName">Votre nom :</label>
      <input
        type="text"
        id="senderName"
        value={senderName}
        onChange={handleSenderNameChange}
      />
      <label htmlFor="invitationMessage">Message de l'invitation :</label>
      <textarea
        id="invitationMessage"
        value={invitationMessage}
        onChange={handleInvitationMessageChange}
        placeholder="Saisissez votre message d'invitation ici..."
        rows={5}
        cols={50}
      />


      <button onClick={sendInvitations}>Envoyer les invitations</button>

      
    </div>
  );
}

export default InvitationForm;
