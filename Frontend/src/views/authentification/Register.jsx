import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/login/auth.css';
import TopBarHome from '../visiteur/TopBarHome';
import image from '../../image/signin.jpg'; // Import de l'image
import Footer from '../visiteur/Footer';
function Register() {
    const [user, setUser] = useState({
        username: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        role: 'exposant' ,// Par défaut, le rôle est exposant
        secretKey: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Déterminer la valeur initiale de secretKey en fonction du rôle
        let initialSecretKey = '';
        if (user.role === 'admin') {
            initialSecretKey = 'admin'; // clé secrète pour admin
        }

        // Créer un objet utilisateur en incluant la valeur initiale de secretKey
        const userData = {
            ...user,
            secretKey: initialSecretKey
        };

        axios.post('http://localhost:5000/api/auth/register', userData)
            .then(result => {
                console.log(result.data);
                if (result.data.msg) {
                    toast.success(result.data.msg);
                } else {
                    toast.error(result.data.error)
                }
            })
            .catch(error => {
                console.error('Erreur lors de la création de l\'utilisateur :');
                toast.error('Erreur lors de la création de l\'utilisateur');
            });
    };

    return (
        <div className='container-compte '>
            <TopBarHome />
            <div className="register">
                <div className="container-register">
                    <div className="welcome-section">
                        <h2>Bienvenue !</h2>
                        <p>Créez un compte pour accéder à toutes les fonctionnalités.</p>
                    </div>
                    <div className="form-section">
                        <form className="formulaire-register" onSubmit={handleSubmit}>
                            <input placeholder="Nom :" type="text" name="username" value={user.username} onChange={handleChange} />
                            <br />
                            <input placeholder="Prénom :" type="text" name="lastname" value={user.lastname} onChange={handleChange} />
                            <br />
                            <input placeholder="Email" type="email" name="email" value={user.email} onChange={handleChange} />
                            <br />
                            <input placeholder="Télephone" type="tel" name="phone" value={user.phone} onChange={handleChange} />
                            <br />
                            <input placeholder="Mot de passe" type="password" name="password" value={user.password} onChange={handleChange} />
                            <br />
                            <div className="radio-buttons" style={{ display: 'flex' }} >
                                <input type="radio" id="admin" name="role" value="admin" checked={user.role === 'admin'} onChange={handleChange} />
                                <label htmlFor="admin">Admin</label>
                                <input type="radio" id="exposant" name="role" value="exposant" checked={user.role === 'exposant'} onChange={handleChange} />
                                <label htmlFor="exposant">Exposant</label>
                            </div>
                            {user.role === 'admin' && (
                                <div>
                                    {/* Champ supplémentaire pour la clé secrète */}
                                    <input placeholder="Clé secrète" type="password" name="secretKey" value={user.secretKey} onChange={handleChange} />
                                </div>
                            )}
                            <button type="submit">Créer utilisateur</button>
                        </form>
                        <div className='image-register' style={{ marginTop: "-380px", marginLeft: "600px" }}>
                            <img src={image} alt="Description de l'image" width="500px" height="400px" />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
           
        </div>
    );
}

export default Register;
