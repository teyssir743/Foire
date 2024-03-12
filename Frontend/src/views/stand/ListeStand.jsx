import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../style/stand/listeStand.css'
function ListeStand() {


    const [stands, setStands] = useState([]);
    const [editedStand, setEditedStand] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/stand/listeStand")
            .then(res => {
                setStands(res.data.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des stands :", error);
            });
    }, []);

    const handleInputChange = (e, standId) => {
        const { name, value } = e.target;
        setEditedStand(prevState => ({
            ...prevState,
            [standId]: {
                ...prevState[standId],
                [name]: value
            }
        }));
    };


    const handleDelete = (standId) => {
        axios.delete(`http://localhost:5000/api/stand/deleteStand/${standId}`)
            .then(() => {
                toast.warn('Stand supprimé');
                console.log('stand supprimé avec succès');
            })
            .catch(error => {
                console.error("Erreur lors de la suppression du stand :", error);
            });
    };

  
    

    return (
        <div className="stand-list">
            <ToastContainer />
            <h1>Liste des stands</h1>
            <ul className="stand-list">
                {stands.map((stand) => (
                    <li key={stand._id}>
                        <label>
                            Nom:
                            <input type="text" name="" defaultValue={stand.nom} />
                        </label>
                        <br />
                        <label>
                            Emplacement:
                            <input type="text" name="" defaultValue={stand.emplacement} />
                        </label>
                        <br />
                        <label>
                            Taille:
                            <input type="text" name="" defaultValue={stand.taille} />
                        </label>
                        <br />
                        <label>
                            État:
                            <select name="" defaultValue={stand.etat} onChange={(e) => handleInputChange(e, stand._id)}>
                                <option value="réservé">Réservé</option>
                                <option value="confirmé">Confirmé</option>
                                <option value="installé">Installé</option>
                                <option value="démonté">Démonté</option>
                            </select>
                        </label>
                        <br />
                        <label>
                Exposant:
                <input type="text" name="" defaultValue={stand.exposant} />
            </label>
            <br/>
            <label>
                Description:
                <textarea name="" type="text" defaultValue={stand.description} />
            </label>
            <br/>
            <label>
                Prix de location:
                <input type="number" name="" defaultValue={stand.prixDeLocation} />
            </label>
    
            <br/>
            <label>
                Date de réservation:
                <input type="date" name="" defaultValue={stand.dateReservation}/>
            </label>
            <br/>
            <label>
                Date d'installation:
                <input type="date" name="" defaultValue={stand.dateInstallation} />
            </label>
            <br/>
            <label>
                Date de démontage:
                <input type="date" name="" defaultValue={stand.dateDemontage}/>
            </label>
            <br/>
            <label>
                Commentaires:
                <textarea type="text" name="" defaultValue={stand.commentaires}/>
            </label>
            <br/>
            <label>
                Services supplémentaires:
                <textarea type="text"name="" defaultValue={stand.service}/>
                
               
            </label>
                      <div className="stand-list-buttons" >
                        <button className="button" onClick={() => navigate(`/updateStand/${stand._id}`)}>Update</button>
                        <button className="button" onClick={() => handleDelete(stand._id)}>Delete</button>
                        </div>
                    
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListeStand;
