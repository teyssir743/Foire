import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import'../../style/login/login.css';

function Login() {
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5000/api/log/login', user)
          .then(response => {
              console.log('Token:', response.data.token);
              toast.success('Connexion réussie !'); // Afficher un toast de succès
              // Stocker le jeton dans le stockage local ou dans un cookie
          })
          .catch(error => {
              console.error('Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.');
              toast.error('Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.'); // Afficher un toast d'erreur
          });
  };
  

    return (
        <div className="container">
              <ToastContainer />
          
            <form  className="form" >
            <h2>Connexion</h2>
                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} />
                <br />

                <label>Mot de passe:</label>
                <input type="password" name="password" value={user.password} onChange={handleChange} />
                <br />

                <button type="submit" onClick={handleSubmit}>Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
