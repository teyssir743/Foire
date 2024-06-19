import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/login/login.css';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import TopBarHome from '../visiteur/TopBarHome';




function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleRememberMeChange = () => {
        setRememberMe(prev => !prev);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!user.email) {
            newErrors.email = "Ce champ est obligatoire";
        }
        if (!user.password) {
            newErrors.password = "Ce champ est obligatoire";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        axios.post('http://localhost:5000/api/auth/login', user)
            .then(response => {
                if (response.data.msg) {
                    toast.success('Connexion réussie !');
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userData', JSON.stringify(response.data.user));

                    setTimeout(() => {
                        if (response.data.user.role === "exposant") {
                            navigate('/EventGallery');
                        } else if (response.data.user.role === "admin") {
                            navigate('/DashbordPage');
                        }
                    }, 2000);
                } else {
                    toast.error(response.data.error);
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Erreur lors de la connexion. Veuillez réessayer.');
            });
    };

    const handleForgotPassword = () => {
        axios.post('http://localhost:5000/api/auth/ask_for_reset_password', { email: user.email })
            .then(() => {
                toast.success('Un code de récupération a été envoyé à votre adresse email.');
            })
            .catch(() => {
                toast.error('Erreur lors de l\'envoi du code de récupération. Veuillez réessayer.');
            });
    };

    useEffect(() => {
        const user = localStorage.getItem('userData');
        if (user) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <TopBarHome />
            <div className='container_log'>
                <div className="flex-container">
                    <div className="form-container">
                        <ToastContainer />
                        <form className="form " onSubmit={handleSubmit}>
                            <h2>Connexion</h2>
                            <div className="input_group">
                                <MdEmail size={35} />
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder='Email'
                                    style={{ marginLeft: '2vw' }}

                                />
                            </div>
                            {errors.email && <span style={{
                                color: "red",
                                fontSize: "0.9em",
                                marginTop: '5px'
                            }}>{errors.email}</span>}
                            <br />
                            <div className="input_group">
                                <RiLockPasswordFill size={35} />
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder='Mot de passe'
                                    style={{ marginLeft: '2vw' }}


                                />
                            </div>
                            {errors.password && <span style={{
                                color: "red",
                                fontSize: "0.9em",
                                marginTop: '5px'
                            }}>{errors.password}</span>}
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
                           <br/> 
                            <p className='Mot_de_passe_oublié'>Mot de passe oublié ?</p>
                            <div className='forgot-password'>
                                
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
