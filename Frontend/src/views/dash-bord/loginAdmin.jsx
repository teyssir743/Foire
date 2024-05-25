import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dash from './Dash';
import loginImage from '../../image/admin.png'; // Importez votre image de connexion

function Login_admin() {
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
        <Dash>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                
            }}>
                <div style={{
                    width:'500px',
                    display: 'flex',
                    flexDirection: 'column', // Mettre en colonne pour centrer le contenu
                    alignItems: 'center', // Centrer horizontalement
                    backgroundColor: 'transparent', // Fond blanc semi-transparent
                    padding: '20px', // Espacement intérieur
                    border: '2px solid #FF007F', // Bordure rose fuchsia
                    borderRadius: '8px', // Coins arrondis
                    marginLeft:'300px',
                    marginTop:'-50px',
                }}>
                    <form style={{ width: '400px', marginBottom: '20px' }}> {/* Augmenter la largeur du formulaire */}
                        <h2 style={{ color: 'white' }}>Connexion</h2>
                        {/* Les champs d'entrée */}
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder='email...'
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #FF007F',
                                borderRadius: '4px',
                                backgroundColor: 'transparent', // Arrière-plan transparent
                                color: 'white' // Couleur du texte en blanc
                            }}
                        />
                        <br />
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder='mot de passe ...'
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #FF007F',
                                borderRadius: '4px',
                                backgroundColor: 'transparent', // Arrière-plan transparent
                                color: 'white' // Couleur du texte en blanc
                            }}
                        />
                        <br />
                        {/* Bouton de connexion */}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: 'none',
                                borderRadius: '4px',
                                backgroundColor: '#FF007F',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >Se connecter</button>
                        {/* Lien pour créer un compte */}
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <p style={{ color: 'white' }}>ou bien</p>
                            <a href="/Register_admin" style={{ color: '#FF007F' }}>créer un compte</a>
                        </div>
                    </form>
                    {/* Affichage de l'image à côté du formulaire */}
                    <img src={loginImage} alt="Admin" style={{ width: '200px' }} />
                </div>
            </div>
        </Dash>
    );
}

export default Login_admin;
