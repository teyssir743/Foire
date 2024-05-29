import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/login/login.css';
import loginImage from '../../image/login.jpg';
import TopBarHome from '../visiteur/TopBarHome';

function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/log/login', user)
            .then(response => {
                const { role, email } = response.data.user;
                const token = response.data.token;
                
                // Stocker le jeton et les informations de l'utilisateur dans le stockage local
                localStorage.setItem('token', token);
                localStorage.setItem('userRole', role);
                localStorage.setItem('userEmail', email);
                
                toast.success('Connexion réussie !');
                
                // Redirection en fonction du rôle
                if (role === 'admin') {
                    navigate('/DashbordPage');
                } else {
                    navigate('/eventGallery');
                }
            })
            .catch(error => {
                console.error('Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.');
                toast.error('Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.');
            });
    };

    return (
        <div>
            <TopBarHome />
            <div className='container'>
                <div className="flex-container">
                    <div className="image-container">
                        <img src={loginImage} alt="Contact" />
                    </div>
                    <div className="form-container">
                        <ToastContainer />
                        <form className="form" onSubmit={handleSubmit}>
                            <h2>Connexion</h2>
                            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder='email...' />
                            <br />
                            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder='mot de passe ...' />
                            <br />
                            <button type="submit">Se connecter</button>
                            <div className='login-lien'>
                           
                                <p>ou bien </p>
                                <a href="/register">créer un compte</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
