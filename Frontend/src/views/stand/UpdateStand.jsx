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
        emplacement: '',
        taille: '',
        etat: 'réservé',
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
            const result = await axios.get(`http://localhost:5000/api/stand/listeStand/${id}`);
            setStand(result.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération du stand :", error);
        }
    };

    const handleUpdateStand = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/stand/updateStand/${id}`, stand)
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
                            <input type="text" name="" value={stand?.nom} onChange={e => setStand({ ...stand, nom: e.target.value })} style={styles.input} />
                        </label>
                        <br />
                        <label style={styles.label}>
                            Emplacement:
                            <input type="text" name="" value={stand?.emplacement} onChange={e => setStand({ ...stand, emplacement: e.target.value })} style={styles.input} />
                        </label>
                        <br />
                        <label style={styles.label}>
                            Taille:
                            <input type="text" name="" value={stand?.taille} onChange={e => setStand({ ...stand, taille: e.target.value })} style={styles.input} />
                        </label>
                        <br />
                        <label style={styles.label}>
                            État:
                            <select name="" value={stand?.etat} onChange={e => setStand({ ...stand, etat: e.target.value })} style={styles.input}>
                                <option value="réservé">Réservé</option>
                                <option value="confirmé">Confirmé</option>
                                <option value="installé">Installé</option>
                                <option value="démonté">Démonté</option>
                            </select>
                        </label>
                        <br />
                        <label style={styles.label}>
                            Exposant:
                            <input type="text" value={stand?.exposant} name="" onChange={e => setStand({ ...stand, exposant: e.target.value })} style={styles.input} />
                        </label>
                        <br />
                        <label style={styles.label}>
                            Description:
                            <textarea name="description" value={stand?.description} type="text" onChange={e => setStand({ ...stand, description: e.target.value })} style={styles.input} />
                        </label>
                        <br />
                    </form>
                </div>
                <div style={styles.rightSection}>
                   <br/>
                    <form style={styles.form}>
                       
                        <label style={styles.label}>
                            Prix de location:
                            <input type="number" value={stand?.prixLocation} name="" onChange={e => setStand({ ...stand, prixLocation: e.target.value })} style={styles.input} />
                        </label>
                        <br />
                        <label style={styles.label}>
                            Date de réservation:
                            <input type="date" name="" value={formatDate(stand?.dateReservation)} onChange={e => setStand({ ...stand, dateReservation: e.target.value })} style={styles.input} />
                        </label>
                        <br />
                        <label style={styles.label}>
                            Date d'installation:
                            <input type="date" name="" value={formatDate(stand?.dateInstallation)} onChange={e => setStand({ ...stand, dateInstallation: e.target.value })} style={styles.input} />
                        </label>
                        <br />
                        <label style={styles.label}>
                            Date de démontage:
                            <input type="date" name="" value={formatDate(stand?.dateDemontage)} onChange={e => setStand({ ...stand, dateDemontage: e.target.value })} style={styles.input} />
                        </label>
                        <br />
                        <label style={styles.label}>
                            Commentaires:
                            <textarea type="text" name="commentaires" value={stand?.commentaires} onChange={e => setStand({ ...stand, commentaires: e.target.value })} style={styles.input} />
                        </label>
                        <br />
                        <label style={styles.label}>
                            Services supplémentaires:
                            <textarea type="text" name="service" value={stand?.service} onChange={e => setStand({ ...stand, service: e.target.value })} style={styles.input} />
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

