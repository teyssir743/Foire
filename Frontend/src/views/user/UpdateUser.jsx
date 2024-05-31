import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { toast , ToastContainer} from 'react-toastify';
import Dash from '../dash-bord/Dash';

function UpdateUser() {
    const [user, setUser] = useState({ username: '', lastname: '', dateNaissance: '', email: '' });
    const { id } = useParams();
    

    const token = localStorage.getItem('token');

    let config = token && {
        headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
    };

    useEffect(() => {
        handleGetUserData(id);
    }, []);

    const handleGetUserData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/user/listeUser/${id}`,config);
            setUser(result.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
    };

    const handleUpdateUser = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/user/updateUser/${id}`, user,config)
            .then(() => {
                console.log('Mise à jour réussie');
                toast.success("Utilisateur mis à jour avec succès ");
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            });
    }

    return (
        <Dash>
            <div style={styles.container}>
                <h1 style={styles.title}>Mettre à jour l'utilisateur</h1>
                <ToastContainer/>

                <form style={styles.form} onSubmit={handleUpdateUser}>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Username:</label>
                        <input type="text" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} style={styles.input} />
                    </div>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Lastname:</label>
                        <input type="text" value={user.lastname} onChange={e => setUser({ ...user, lastname: e.target.value })} style={styles.input} />
                    </div>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Date de naissance:</label>
                        <input type="date" value={user.dateNaissance} onChange={e => setUser({ ...user, dateNaissance: e.target.value })} style={styles.input} />
                    </div>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Email:</label>
                        <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} style={styles.input} />
                    </div>
                    <button type="submit" style={styles.submitButton}>Mettre à jour</button>
                </form>
            </div>
        </Dash>
    );
}

export default UpdateUser;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        marginBottom: '20px',
    },
    form: {
        width: '600px',
    },
    inputContainer: {
        marginBottom: '20px',
    },
    label: {
        color: 'white',
        marginRight: '10px',
    },
    input: {
        background: 'transparent',
        border: 'none',
        borderBottom: '2px solid #FF007F',
        width: '100%',
        padding: '8px',
        color: 'white',
        outline: 'none',
    },
    submitButton: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: '#FF007F',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
    },
};
