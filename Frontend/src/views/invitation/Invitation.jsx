import { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import Dash from '../dash-bord/Dash';
import { toast, ToastContainer } from 'react-toastify'; // Import de react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Styles par défaut de react-toastify

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: 'transparant', // Arrière-plan transparent
  borderRadius: '8px',
  color: 'white', // Texte blanc
  maxWidth: '500px',
  margin: 'auto', // Centre le formulaire horizontalement
  marginTop: '100px',
  marginLeft:'200px',
  border: '2px solid #FF007F', // Bordure rose fuchsia
});

const InputField = styled('input')({
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #FF007F', // Bordure rose fuchsia
  fontSize: '16px',
  backgroundColor: 'transparent', // Arrière-plan transparent
  color: 'white', // Texte blanc
});

const TextAreaField = styled('textarea')({
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #FF007F', // Bordure rose fuchsia
  fontSize: '16px',
  backgroundColor: 'transparent', // Arrière-plan transparent
  color: 'white', // Texte blanc
  resize: 'vertical',
});

const SubmitButton = styled('button')({
  padding: '10px 20px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#FF007F', // Fond rose fuchsia
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#ff0055', // Teinte plus foncée sur le survol
  },
});

function InvitationForm() {
  const [senderName, setSenderName] = useState('');
  const [invitationMessage, setInvitationMessage] = useState('');

  const handleSenderNameChange = (e) => {
    setSenderName(e.target.value);
  };

  const handleInvitationMessageChange = (e) => {
    setInvitationMessage(e.target.value);
  };


  const token = localStorage.getItem('token');

  let config = token && {
    headers: {
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    }
  };

  const sendInvitations = async () => {
    try {
      await axios.post('http://localhost:5000/api/invitation/createInvitation', {
        senderName: senderName,
        invitationMessage: invitationMessage
      }, config);
      toast.success('Invitations envoyées avec succès !'); // Affiche la toast de succès
    } catch (error) {
      console.error('Erreur lors de l\'envoi des invitations :', error);
      // Ajouter une logique pour gérer les erreurs, par exemple afficher une alerte
    }
  };

  return (
    <Dash>
      <FormContainer>
        <h2>Envoyer des invitations</h2>
        
        <InputField
          type="text"
          id="senderName"
          value={senderName}
          onChange={handleSenderNameChange}
          placeholder="Votre nom"
        />
        
        <TextAreaField
          id="invitationMessage"
          value={invitationMessage}
          onChange={handleInvitationMessageChange}
          placeholder="Saisissez votre message d'invitation ici..."
          rows={5}
          cols={50}
        />

        <SubmitButton onClick={sendInvitations}>Envoyer les invitations</SubmitButton>

        <ToastContainer /> {/* Container pour afficher les toasts */}
      </FormContainer>
    </Dash>
  );
}

export default InvitationForm;
