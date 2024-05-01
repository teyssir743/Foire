import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../style/stand/listeStand.css';
import Dash from '../dash-bord/Dash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function ListeStand() {
    const [stands, setStands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/stand/listeStand")
            .then(res => {
                // Ajoutez une propriété 'id' à chaque objet de données
                const dataWithIds = res.data.data.map((stand, index) => ({
                    ...stand,
                    id: index + 1 // Utilisez un ID unique pour chaque objet (vous pouvez utiliser l'ID de la base de données si disponible)
                }));
                setStands(dataWithIds);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des stands :", error);
            });
    }, []);

    const handleInputChange = (e, standId) => {
        const { name, value } = e.target;
        // Implémentez votre logique de mise à jour des données ici
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
        <Dash>
            <div className="stand-list">
                <ToastContainer />
                
                <button className="buttonCreate" >Create Stand</button>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={stands}
                        columns={[
                           { field: 'id', headerName: 'ID', width: 100 }, // Ajout de la colonne ID
                            { field: 'nom', headerName: 'Nom', width: 150 },
                            { field: 'emplacement', headerName: 'Emplacement', width: 150 },
                            { field: 'taille', headerName: 'Taille', width: 150 },
                            { field: 'etat', headerName: 'État', width: 150 },
                            { field: 'exposant', headerName: 'Exposant', width: 150 },
                            { field: 'description', headerName: 'Description', width: 150 },
                            { field: 'prixDeLocation', headerName: 'Prix de location', width: 150 },
                            { field: 'dateReservation', headerName: 'Date de réservation', width: 150 },
                            { field: 'dateInstallation', headerName: 'Date d\'installation', width: 150 },
                            { field: 'dateDemontage', headerName: 'Date de démontage', width: 150 },
                            { field: 'commentaires', headerName: 'Commentaires', width: 150 },
                            { field: 'service', headerName: 'Services supplémentaires', width: 150 },
                            {
                                field: 'update',
                                headerName: 'Update',
                                width: 100,
                                renderCell: (params) => (
                                    <button className="button-Update" onClick={() => navigate(`/updateStand/${params.row._id}`)}>Update</button>
                                )
                            },
                            
                            
                            {
                                field: 'delete',
                                headerName: 'Delete',
                                width: 100,
                                renderCell: (params) => (
                                    <button className="button-Delete" onClick={() => handleDelete(params.row._id)}>Delete</button>
                                )
                            },
                            // Ajoutez d'autres colonnes pour chaque champ de données
                        ]}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        pagination
                        autoHeight
                        components={{
                            Toolbar: GridToolbar, // Ajout de GridToolbar
                        }}
                    />
                </div>
            </div>
        </Dash>
    );
}

export default ListeStand;
