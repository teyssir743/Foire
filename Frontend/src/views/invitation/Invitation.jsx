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
  marginLeft: '200px',
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
  backgroundColor: '#FF007F', 
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  
});

const ErrorText = styled('span')({
  color: 'red',
  fontSize: '0.875rem',
  marginBottom: '10px',
});

function InvitationForm() {
  const [senderName, setSenderName] = useState('');
  const [invitationMessage, setInvitationMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!senderName) newErrors.senderName = 'Le nom est requis';
    if (!invitationMessage) newErrors.invitationMessage = 'Le message est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validate()) return;

    try {
      await axios.post('http://localhost:5000/api/invitation/createInvitation', {
        senderName: senderName,
        invitationMessage: invitationMessage
      }, config);
      toast.success('Invitations envoyées avec succès !'); 
    } catch (error) {
      console.error('Erreur lors de l\'envoi des invitations :', error);
      toast.error('Erreur lors de l\'envoi des invitations');
    }
  };

  return (
    <Dash>
      <FormContainer>
        <h2 style={{marginBottom:'3vh'}}>Envoyer des invitations</h2>

        <InputField
          type="text"
          id="senderName"
          value={senderName}
          onChange={handleSenderNameChange}
          placeholder="Votre nom"
          style={{ marginBottom: '3vh' }}
        />
        {errors.senderName && <ErrorText>{errors.senderName}</ErrorText>}

        <TextAreaField
          id="invitationMessage"
          value={invitationMessage}
          onChange={handleInvitationMessageChange}
          style={{ marginBottom: '3vh' }}
          placeholder="Saisissez votre message d'invitation ici..."
          rows={5}
          cols={50}
        />
        {errors.invitationMessage && <ErrorText>{errors.invitationMessage}</ErrorText>}

        <SubmitButton onClick={sendInvitations} >Envoyer les invitations</SubmitButton>

        <ToastContainer /> {/* Container pour afficher les toasts */}
      </FormContainer>
    </Dash>
  );
}

export default InvitationForm;
