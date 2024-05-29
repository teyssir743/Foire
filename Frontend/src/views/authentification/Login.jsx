import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/login/login.css';
import emailIcon from '../../icone/mail.png';
import passwordIcon from '../../icone/pass.png';
import TopBarHome from '../visiteur/TopBarHome';

function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleRememberMeChange = () => {
        setRememberMe(prev => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/log/login', user)
            .then(response => {
                console.log('Token:', response.data.token);
                toast.success('Connexion réussie !');
                if (rememberMe) {
                    localStorage.setItem('token', response.data.token);
                } else {
                    sessionStorage.setItem('token', response.data.token);
                }
            })
            .catch(error => {
                console.error('Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.');
                toast.error('Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.');
            });
    };

    const handleForgotPassword = () => {
        axios.post('http://localhost:5000/api/log/forgot-password', { email: user.email })
            .then(response => {
                toast.success('Un code de récupération a été envoyé à votre adresse email.');
            })
            .catch(error => {
                toast.error('Erreur lors de l\'envoi du code de récupération. Veuillez réessayer.');
            });
    };

    return (
        <div>
            <TopBarHome />
            <div className='container_log'>
                <div className="flex-container">
                    <div className="form-container">
                        <ToastContainer />
                        <form className="form" onSubmit={handleSubmit}>
                            <h2>Connexion</h2>
                            <div className="input-group">
                                <img src={emailIcon} alt="Email Icon" className="input-icon" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={user.email} 
                                    onChange={handleChange} 
                                    placeholder='              Email' 
                                    required 
                                />
                            </div>
                            <br />
                            <div className="input-group">
                                <img src={passwordIcon} alt="Password Icon" className="input-icon" />
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={user.password} 
                                    onChange={handleChange} 
                                    placeholder='              Mot de passe ' 
                                    required 
                                />
                            </div>
                            <br />
                            <div className="remember-me">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                                <label htmlFor="rememberMe">Se souvenir de moi</label>
                            </div>
                            <br />
                            <button type="submit" className='log'>Se connecter</button>
                            <div className='login-lien'>
                                <p>ou bien </p>
                                <a href="/register">créer un compte</a>
                            </div>
                            <div className='forgot-password'>
                                <p>Mot de passe oublié ?</p>
                                <button type="button" onClick={handleForgotPassword} className='forgot-password-button'>Réinitialiser le mot de passe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
