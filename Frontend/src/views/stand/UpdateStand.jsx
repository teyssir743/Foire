import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../util/DateConvertor';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dash from '../dash-bord/Dash';

function UpdateStand() {
    const [stand, setStand] = useState({
        nom: '',
        numero:'',
        emplacement: '',
        taille: '',
        etat: '',
        exposant: '',
        description: '',
        prixLocation: 0,
        dateReservation: '',
        dateInstallation: '',
        dateDemontage: '',
        commentaires: '',
        service: ''
    });
    const { id } = useParams();
    const token = localStorage.getItem('token');

    let config = token && {
        headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
    };

    useEffect(() => {
        handleGetStandData(id);
    }, []);

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

    const handleGetStandData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/stand/listeStand/${id}`,config);
            setStand(result.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération du stand :", error);
        }
    };

    const handleUpdateStand = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/stand/updateStand/${id}`, stand, config)
            .then(() => {
                toast.success("Stand mis à jour avec succès");
                console.log('Mise à jour réussie', stand);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour du stand :", error);
                toast.error("Erreur lors de la mise à jour du stand");
            });
    }

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between', // Divise l'espace entre les éléments
            alignItems: 'flex-start', // Aligne les éléments en haut
            width: '80%', // Largeur de la page
            margin: 'auto' // Centre le contenu horizontalement
        },
        leftSection: {
            width: '48%', // Largeur de la partie gauche
           
        },
        rightSection: {
            width: '48%', // Largeur de la partie droite
            marginLeft: '200px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '10px',
            color: 'white',
        },
        input: {
            background: 'transparent',
            border: 'none',
            borderBottom: '2px solid #FF007F',
            width: '100%',
            padding: '8px',
            color: 'white',
            marginBottom: '10px',
            outline: 'none',
        },
        button: {
            width: '40%',
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
                <div style={styles.leftSection}>
                    <h1>Update Stand</h1>
                    <form style={styles.form}>
                       <label style={styles.label}>
                        Nom:
                        <input type="text" name="nom" value={stand?.nom} onChange={(e) => setStand({ ...stand, nom: e.target.value })} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>
                        Numéro:
                        <input type="number" name="numero" value={stand?.num}  onChange={(e) => setStand({ ...stand, numero: e.target.value })} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>
                        Emplacement:
                        <input type="text" name="emplacement" value={stand?.emplacement} onChange={(e) => setStand({ ...stand, emplacement: e.target.value })} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>
                        Taille:
                        <input type="text" name="taille" value={stand?.taille} onChange={(e) => setStand({ ...stand, taille: e.target.value })} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>
                        État:
                        <select name="etat" value={stand?.etat} onChange={(e) => setStand({ ...stand, etat: e.target.value })} style={styles.select}>
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
                    </form>
                </div>
            </div>
            <button style={styles.button} onClick={handleUpdateStand}>Update Stand</button>
            <ToastContainer />
        </Dash>
    );
}

export default UpdateStand;

