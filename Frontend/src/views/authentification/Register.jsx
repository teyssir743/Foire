import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBarHome from '../visiteur/TopBarHome';
import image from '../../image/signin.jpg';
import Footer from '../visiteur/Footer';

function Register() {
    const [user, setUser] = useState({
        username: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        role: 'exposant',
        secretKey: ''
    });

    const [errors, setErrors] = useState({});

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

        axios.post('http://localhost:5000/api/auth/register', user)
            .then(result => {
                console.log(result.data);
                if (result.data.msg) {
                    toast.success(result.data.msg);
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
        <div className='max-h-screen  flex flex-col '>
            <ToastContainer />
            <TopBarHome />
            <div className="flex flex-1 items-center justify-center ">
                <div className="p-8 rounded-lg shadow-md w-full container_register">
                    <div className="mb-4 text-center">
                        <h2 className="text-2xl font-bold">Bienvenue !</h2>
                        <p className="text-gray-600">Créez un compte pour accéder à toutes les fonctionnalités.</p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center ">
                        <form className="w-full lg:w-1/2" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input className="border p-2 w-full" placeholder="Nom :" type="text" name="username" value={user.username} onChange={handleChange} />
                                {errors.username && <><br /><span className="text-red-500">{errors.username}</span></>}
                            </div>
                            <div className="mb-4">
                                <input className="border p-2 w-full" placeholder="Prénom :" type="text" name="lastname" value={user.lastname} onChange={handleChange} />
                                {errors.lastname && <><br /><span className="text-red-500">{errors.lastname}</span></>}
                            </div>
                            <div className="mb-4">
                                <input className="border p-2 w-full" placeholder="Email" type="email" name="email" value={user.email} onChange={handleChange} />
                                {errors.email && <><br /><span className="text-red-500">{errors.email}</span></>}
                            </div>
                            <div className="mb-4">
                                <input className="border p-2 w-full" placeholder="Télephone" type="tel" name="phone" value={user.phone} onChange={handleChange} />
                                {errors.phone && <><br /><span className="text-red-500">{errors.phone}</span></>}
                            </div>
                            <div className="mb-4">
                                <input className="border p-2 w-full" placeholder="Mot de passe" type="password" name="password" value={user.password} onChange={handleChange} />
                                {errors.password && <><br /><span className="text-red-500">{errors.password}</span></>}
                            </div>
                            <button type="submit" className="mt-4 bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-700">Créer utilisateur</button>
                        </form>
                        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-8 flex justify-center">
                            <img src={image} alt="Description de l'image" className="w-full h-auto rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
