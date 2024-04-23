// Register.jsx


import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/login/auth.css';
import TopBarHome from '../visiteur/TopBarHome';

import image from '../../image/signin.jpg'; // Import de l'image

function Register() {
    const [user, setUser] = useState({
        username: '',
        lastname: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/register', user)
            .then(result => {
                console.log(result.data);
                if (result.data.msg)
                   {toast.success(result.data.msg);}
                else {
                    toast.error(result.data.error)
                    }
            })
            .catch(error => {
                console.error('Erreur lors de la création de l\'utilisateur :' );
                toast.error('Erreur lors de la création de l\'utilisateur');
                
                 
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <TopBarHome/>

        <div className="register">

            <div className="container-register">
                
                
                    <div className="welcome-section">
                        <h2>Bienvenue !</h2>
                        <p>Créez un compte pour accéder à toutes les fonctionnalités.</p>
                    </div>
                
                
            


                    <div className="form-section">

                        <form className="formulaire-register" onSubmit={handleSubmit}>
                            
                        
                            
                            <input  placeholder="nom:" type="text" name="username" value={user.username} onChange={handleChange} />
                            <br />

                            
                            <input   placeholder="prénom:"type="text" name="lastname" value={user.lastname} onChange={handleChange} />
                            <br />

                            <input placeholder='email' type="email" name="email" value={user.email} onChange={handleChange} />
                            <br />

                            
                            <input placeholder="télephone " type="tel" name="phone" value={user.phone} onChange={handleChange} />
                            <br />

                            
                            <input  placeholder=" mot de passe" type="password" name="password" value={user.password} onChange={handleChange} />
                            <br />

                            <button type="submit">Créer utilisateur</button>

                        </form>
                        <div className='image-register' style={{ marginTop: "-380px", marginLeft:"600px" }} >
                       <img src={image} alt="Description de l'image"  width="500px"  height="400px"  />
                       </div>
                    </div>
             


                

              </div>


              
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register;
