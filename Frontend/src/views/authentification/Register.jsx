import { useState } from 'react';
import '../../style/login/auth.css'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBarHome from '../visiteur/TopBarHome';
import image from '../../image/signin.jpg';
import Footer from '../visiteur/Footer';
import {useNavigate} from 'react-router-dom'
function Register() {
    const [user, setUser] = useState({
        username: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        role: 'exposant',
       //secretkey:''
    });

    const [errors, setErrors] = useState({});
const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevState => ({
            ...prevState,
            [name]: ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        Object.keys(user).forEach(key => {
            if (!user[key]) {
                validationErrors[key] = 'Ce champ est obligatoire';
            }
        });

        if (Object.keys(validationErrors).length > 0) {
           
            setErrors(validationErrors);
            return;
        }
        console.log(user)
        axios.post('http://localhost:5000/api/auth/register', user)

            .then(result => {
                console.log(result.data);
                if (result.data.msg) {
                    toast.success(result.data.msg);
                    setTimeout(() => {
                        navigate('/login',{replace:true})
                    }, 2000);
                } else {
                    toast.error(result.data.error);
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Erreur lors de la création de l\'utilisateur');
            });
    };

    return (
        <div className='container-compte '>
            <ToastContainer />
            <TopBarHome />
            <div className="register ">
                <div className="welcom-section">
                    <div className="welcomSection">
                        <h2>Bienvenue !</h2>
                        <p>Créez un compte pour accéder à toutes les fonctionnalités.</p>
                    </div>
                    <div className="formulaire-create ">
                        <form  onSubmit={handleSubmit}>
                            <div className='input' >
                                <input  placeholder="Nom :" name="username" value={user.username} onChange={handleChange} />
                                {errors.username && <><br /><span className="text-red-500">{errors.username}</span></>}
                            </div>
                            <div className='input'>
                                <input placeholder="Prénom :" name="lastname" value={user.lastname} onChange={handleChange} />
                                {errors.lastname && <><br /><span className="text-red-500">{errors.lastname}</span></>}
                            </div>
                            <div className='input'>
                                <input  placeholder="Email" type="email" name="email" value={user.email} onChange={handleChange} />
                                {errors.email && <><br /><span className="text-red-500">{errors.email}</span></>}
                            </div>
                            <div className='input'>
                                <input  placeholder="Télephone" type="tel" name="phone" value={user.phone} onChange={handleChange} />
                                {errors.phone && <><br /><span className="text-red-500">{errors.phone}</span></>}
                            </div>
                            <div className='input'>
                                <input  placeholder="Mot de passe" type="password" name="password" value={user.password} onChange={handleChange} />
                                {errors.password && <><br /><span className="text-red-500">{errors.password}</span></>}
                            </div>
                            <button  className="crete-user"type="submit">Créer utilisateur</button>
                        </form>
                        <div className="image-register">
                            <img src={image} alt="Description de l'image"  />
                        </div>

                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
