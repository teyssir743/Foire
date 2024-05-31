// sendInvitations.js (Fichier utilitaire)

import axios from 'axios';


const token = localStorage.getItem('token');

let config = token && {
  headers: {
    Authorization: `Bearer ${token.replace(/"/g, '')}`
  }
};
// Fonction pour envoyer une invitation à tous les utilisateurs enregistrés
const sendInvitationsToAllUsers = async({invitationMessage}) => {
  try {
    // Récupérer la liste des utilisateurs depuis votre backend
    const response = await axios.get('http://localhost:5000/api/user/listeUser', config);
    const users = response.data.data;
    

    // Parcourir la liste des utilisateurs et envoyer une invitation à chacun
    users.forEach(async (user) => {
      const {email } = user;
      // Envoyer une invitation à l'e-mail de l'utilisateur
      await axios.post('http://localhost:5000/api/invitation/createInvitation',{ email, invitationMessage } ,config);
    });

    // Afficher un message de succès
    alert('Invitations envoyées avec succès à tous les utilisateurs !');
  } catch (error) {
    console.error('Erreur lors de l\'envoi des invitations :', error);
    // Afficher un message d'erreur
    alert('Erreur lors de l\'envoi des invitations. Veuillez réessayer.');
  }
};

export default sendInvitationsToAllUsers;
