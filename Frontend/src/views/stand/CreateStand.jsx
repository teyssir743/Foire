import React, { useState } from 'react';
import axios from 'axios';
import '../../style/stand/createStand.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Dash from '../dash-bord/Dash';

function CreateStand() {
    const [stand, setStand] = useState(null);

    const handleCreateStand = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/stand/createStand", stand)
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
                    <h1 style={{color:'white'}}>Créer Stand</h1>
                    <label style={styles.label}>
                        Nom:
                        <input type="text" name="nom" onChange={(e) => setStand({ ...stand, nom: e.target.value })} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>
                        Numéro:
                        <input type="number" name="numero" onChange={(e) => setStand({ ...stand, numero: e.target.value })} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>
                        Emplacement:
                        <input type="text" name="emplacement" onChange={(e) => setStand({ ...stand, emplacement: e.target.value })} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>
                        Taille:
                        <input type="text" name="taille" onChange={(e) => setStand({ ...stand, taille: e.target.value })} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>
                        État:
                        <select name="etat" onChange={(e) => setStand({ ...stand, etat: e.target.value })} style={styles.select}>
                            <option value="réservé">Réservé</option>
                            <option value="disponible">Disponible</option>
                        </select>
                    </label>
                    <br />
                    <label style={styles.label}>
                        Prix de location:
                        <input type="number" name="prixLocation" onChange={(e) => setStand({ ...stand, prixLocation: e.target.value })} style={styles.input} />
                    </label>
                    <br />
                    <button type="submit" onClick={handleCreateStand} style={styles.button}>Créer Stand</button>
                </form>
            </div>
            <ToastContainer />
        </Dash>
    );
}

export default CreateStand;
