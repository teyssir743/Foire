import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/login/login.css';
import emailIcon from '../../icone/mail.png';
import passwordIcon from '../../icone/pass.png';
import TopBarHome from '../visiteur/TopBarHome';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleRememberMeChange = () => {
        setRememberMe(prev => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        axios.post('http://localhost:5000/api/auth/login', user)
            .then(response => {
                if (response.data.msg) {
                    console.log('Token:', response.data.token);
                    toast.success('Connexion réussie !');
                    if (rememberMe) {
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('userData', JSON.stringify(response.data.user))
                    } else {
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('userData', JSON.stringify(response.data.user))
                    }
                    setTimeout(() => {
                        if (response.data.user.role == "exposant") {
                            navigate('/EventGallery')
                        } else if (response.data.user.role == "admin") {
                            navigate('/DashbordPage')
                        }

                    }, 2000);

                } else {
                    toast.error(response.data.error);

                }

            })
            .catch(error => {
                console.error(error);

            });
    };

    const handleForgotPassword = () => {
        axios.post('http://localhost:5000/api/auth/ask_for_reset_password', { email: user.email })
            .then(response => {
                toast.success('Un code de récupération a été envoyé à votre adresse email.');
            })
            .catch(error => {
                toast.error('Erreur lors de l\'envoi du code de récupération. Veuillez réessayer.');
            });
    };

    useEffect(() => {
        let user = localStorage.getItem('userData')

        if (user) {
            return navigate('/')
        }

    })


    return (
        <div>
            <TopBarHome />
            <div className='container_log'>
                <div className="flex-container">
                    <div className="form-container">
                        <ToastContainer />
                        <form className="form" onSubmit={handleSubmit}>
                            <h2>Connexion</h2>
                            <div className="input_group">
                                <div><MdEmail size={35} /></div> <div><input

                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder='Email'
                                    required
                                /></div>
                            </div>
                            <br />
                            <div className="input_group">
                                <div>  <RiLockPasswordFill size={35} /></div>
                                <div><input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder='Mot de passe'
                                    required
                                /></div>
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