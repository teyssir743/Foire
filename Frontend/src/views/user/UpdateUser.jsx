import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { formatDate } from '../../util/DateConvertor';
import { toast , ToastContainer} from 'react-toastify';


function UpdateUser() {

    const [user, setUser] = useState({ username: '', lastname: '', dateNaissance: '', email: '' });
    const { id } = useParams();
    
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
      };

    useEffect(() => {
        handleGetUserData(id);
    }, []);

    const handleGetUserData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/user/listeUser/${id}`);
            setUser(result.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
    };

    const handleUpdateUser = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/user/updateUser/${id}`, user)
            .then(() => {
                console.log('Mise à jour réussie');
                toast.success("utilisateur mise a jour avec succes ")           })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            });
    }

  


    return (
        <div>
            <h1>Mettre à jour l'utilisateur</h1>
            <ToastContainer/>

            <label>Username:</label>
            <input type="text" value={user.username} onChange={e => handleInputChange('username', e.target.value)} />
            <br />

            <label>Lastname:</label>
            <input type="text" value={user.lastname} onChange={e => handleInputChange('lastname', e.target.value)} />
            <br />

            <label>Date de naissance:</label>
            <input type="date" value={formatDate(user?.dateNaissance)} onChange={e => handleInputChange('dateNaissance', e.target.value)} />
            <br />

            <label>Email:</label>
            <input type="email" value={user.email} onChange={e => handleInputChange('email', e.target.value)} />
            <br />

            <button onClick={handleUpdateUser} type="button">Mettre à jour</button>
        </div>
    );
}

export default UpdateUser;
