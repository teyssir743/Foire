import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dash from './Dash';

function Register_admin() {
    const [user, setUser] = useState({
        username: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        role: 'exposant', // Par défaut, le rôle est exposant
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
        <Dash>
            <div>
                <div style={styles.container}>
                    <div style={styles.registerContainer}>
                        <div style={styles.welcomeSection}>
                            <h2>Bienvenue !</h2>
                            <p>Créez un compte pour accéder à toutes les fonctionnalités.</p>
                        </div>
                        <div style={styles.formSection}>
                            <form onSubmit={handleSubmit}>
                                <div style={styles.inputContainer}>
                                    <input placeholder="Nom :" type="text" name="username" value={user.username} onChange={handleChange} style={styles.input} />
                                </div>
                                <div style={styles.inputContainer}>
                                    <input placeholder="Prénom :" type="text" name="lastname" value={user.lastname} onChange={handleChange} style={styles.input} />
                                </div>
                                <div style={styles.inputContainer}>
                                    <input placeholder="Email" type="email" name="email" value={user.email} onChange={handleChange} style={styles.input} />
                                </div>
                                <div style={styles.inputContainer}>
                                    <input placeholder="Télephone" type="tel" name="phone" value={user.phone} onChange={handleChange} style={styles.input} />
                                </div>
                                <div style={styles.inputContainer}>
                                    <input placeholder="Mot de passe" type="password" name="password" value={user.password} onChange={handleChange} style={styles.input} />
                                </div>
                                <div style={styles.radioButtons}>
                                    <input type="radio" id="admin" name="role" value="admin" checked={user.role === 'admin'} onChange={handleChange} />
                                    <label htmlFor="admin" style={user.role === 'admin' ? styles.radioLabelSelected : styles.radioLabel}>Admin</label>
                                    <input type="radio" id="exposant" name="role" value="exposant" checked={user.role === 'exposant'} onChange={handleChange} />
                                    <label htmlFor="exposant" style={user.role === 'exposant' ? styles.radioLabelSelected : styles.radioLabel}>Exposant</label>
                                </div>
                                {user.role === 'admin' && (
                                    <div style={styles.inputContainer}>
                                        <input placeholder="Clé secrète" type="password" name="secretKey" value={user.secretKey} onChange={handleChange} style={styles.input} />
                                    </div>
                                )}
                                <div style={styles.buttonContainer}>
                                    <button type="submit" style={styles.submitButton}>Créer utilisateur</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </Dash>
    );
}

export default Register_admin;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: '20px',
        border: '2px solid #FF007F',
        borderRadius: '8px',
        height: '600px',
        marginTop: '50px',
        marginLeft: '200px', // Marge à gauche
    },
    welcomeSection: {
        textAlign: 'center',
        color: 'white', // Texte en blanc
    },
    formSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        padding: '20px', // Ajout de padding pour espacer les éléments de la bordure
       
    },
    form: {
        width: '600px',
    },
    inputContainer: {
        marginBottom: '10px',
    },
    input: {
        background: 'transparent', // Fond transparent
        border: 'none', // Pas de bordure
        borderBottom: '2px solid #FF007F', // Bordure basse rose fuchsia
        width: '100%', // Largeur à 100%
        padding: '8px', // Espacement intérieur
        color: 'white', // Texte en blanc
        marginBottom: '10px', // Marge inférieure
        outline: 'none', // Pas de contour
    },

    radioButtons: {
        display: 'flex',
        marginBottom: '10px',
    },
    radioLabel: {
        marginLeft: '5px', // Espacement à gauche
        color: 'white', // Texte en blanc
    },
    radioLabelSelected: {
        marginLeft: '5px', // Espacement à gauche
        color: '#FF007F', // Texte en rose fuchsia
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    submitButton: {
        width: '90%',
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: '#FF007F', // Arrière-plan transparent
        color: 'white', // Texte en blanc
        cursor: 'pointer',
    },
};
