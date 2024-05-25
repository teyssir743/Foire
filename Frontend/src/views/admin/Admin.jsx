import { useState } from 'react';
import axios from 'axios';

function AdminForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminData = {
      username,
      email,
      password,
    };

    console.log('Admin data to be sent:', adminData);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/createAdmin', adminData);
      console.log(response.data);
      // Ajouter une logique pour gérer la réponse, par exemple afficher un message de succès
    } catch (error) {
      console.error('Erreur lors de la création de l\'administrateur :', error.response ? error.response.data : error.message);
      // Ajouter une logique pour gérer les erreurs, par exemple afficher une alerte
    }
  };

  return (
    <div>
      <h2>Créer un nouvel administrateur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer l'administrateur</button>
      </form>
    </div>
  );
}

export default AdminForm;
