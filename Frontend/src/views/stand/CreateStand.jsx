import React, { useState } from 'react';
import axios from 'axios';
import '../../style/stand/createStand.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Dash from '../dash-bord/Dash';

function CreateStand() {
    const [stand, setStand] = useState({});
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');

    let config = token && {
        headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!stand.nom) newErrors.nom = 'Nom est requis';
        if (!stand.numero) newErrors.numero = 'Numéro est requis';
        if (!stand.emplacement) newErrors.emplacement = 'Emplacement est requis';
        if (!stand.taille) newErrors.taille = 'Taille est requise';
        if (!stand.etat) newErrors.etat = 'État est requis';
        if (!stand.prixLocation) newErrors.prixLocation = 'Prix de location est requis';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateStand = (e) => {
        e.preventDefault();
        if (!validate()) return;
        axios.post("http://localhost:5000/api/stand/createStand", stand, config)
            .then(() => {
                toast.success("Stand ajouté avec succès !");
            })
            .catch(() => {
                toast.error('Quelque chose a mal tourné !');
            });
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
        form: {
            width: '400px',
            padding: '20px',
            border: '2px solid #FF007F',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px',
            marginLeft: '350px',
        },
        input: {
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            background: 'transparent',
            border: 'none',
            borderBottom: '2px solid #FF007F',
            color: 'white',
            outline: 'none',
        },
        select: {
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            background: 'transparent',
            border: 'none',
            borderBottom: '2px solid #FF007F',
            color: 'white',
            outline: 'none',
        },
        label: {
            marginBottom: '5px',
            color: 'white',
        },
        error: {
            color: 'red',
            fontSize: '0.875rem',
            marginBottom: '10px',
        },
        button: {
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#FF007F',
            color: 'white',
            cursor: 'pointer',
        },
    };

    return (
        <Dash>
            <div style={styles.container}>
                <form style={styles.form} className="create-stand">
                    <h1 style={{ color: 'white' }}>Créer Stand</h1>
                    <label style={styles.label}>
                        Nom:
                        <input
                            type="text"
                            name="nom"
                            onChange={(e) => setStand({ ...stand, nom: e.target.value })}
                            style={styles.input}
                        />
                        {errors.nom && <span style={styles.error}>{errors.nom}</span>}
                    </label>
                    <label style={styles.label}>
                        Numéro:
                        <input
                            type="number"
                            name="numero"
                            onChange={(e) => setStand({ ...stand, numero: e.target.value })}
                            style={styles.input}
                        />
                        {errors.numero && <span style={styles.error}>{errors.numero}</span>}
                    </label>
                    <label style={styles.label}>
                        Emplacement:
                        <input
                            type="text"
                            name="emplacement"
                            onChange={(e) => setStand({ ...stand, emplacement: e.target.value })}
                            style={styles.input}
                        />
                        {errors.emplacement && <span style={styles.error}>{errors.emplacement}</span>}
                    </label>
                    <label style={styles.label}>
                        Taille:
                        <input
                            type="text"
                            name="taille"
                            onChange={(e) => setStand({ ...stand, taille: e.target.value })}
                            style={styles.input}
                        />
                        {errors.taille && <span style={styles.error}>{errors.taille}</span>}
                    </label>
                    <label style={styles.label}>
                        État:
                        <select
                            name="etat"
                            onChange={(e) => setStand({ ...stand, etat: e.target.value })}
                            style={styles.select}
                        >
                            <option style={{color:"black"}} value="réservé">Réservé</option>
                            <option style={{ color: "black" }} value="disponible">Disponible</option>
                        </select>
                        {errors.etat && <span style={styles.error}>{errors.etat}</span>}
                    </label>
                    <label style={styles.label}>
                        Prix de location:
                        <input
                            type="number"
                            name="prixLocation"
                            onChange={(e) => setStand({ ...stand, prixLocation: e.target.value })}
                            style={styles.input}
                        />
                        {errors.prixLocation && <span style={styles.error}>{errors.prixLocation}</span>}
                    </label>
                    <button type="submit" onClick={handleCreateStand} style={styles.button}>Créer Stand</button>
                </form>
            </div>
            <ToastContainer />
        </Dash>
    );
}

export default CreateStand;
