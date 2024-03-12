import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import'../../style/login/auth.css';

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
        <div className="container">
            
            <form  className="form" onSubmit={handleSubmit}>
            <h4>Créer un compte</h4>
                <label>Username:</label>
                <input type="text" name="username" value={user.username} onChange={handleChange} />
                <br />

                <label>Lastname:</label>
                <input type="text" name="lastname" value={user.lastname} onChange={handleChange} />
                <br />

                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} />
                <br />

                <label>Phone:</label>
                <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
                <br />

                <label>Password:</label>
                <input type="password" name="password" value={user.password} onChange={handleChange} />
                <br />

                <button type="submit">Créer utilisateur</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Register;
