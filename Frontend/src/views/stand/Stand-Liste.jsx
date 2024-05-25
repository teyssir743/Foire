import { useState, useEffect } from 'react';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dash from '../dash-bord/Dash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function ListeStand1() {
  const [stands, setStands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/stand/listeStand")
      .then(res => {
        // Ajouter une propriété id unique à chaque stand
        const standsWithId = res.data.data.map((stand, index) => ({
          ...stand,
          id: index + 1 // Utilisez un index basé sur 1 ou un identifiant unique de la base de données
        }));
        setStands(standsWithId);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des stands :", error);
      });
  }, []);

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/stand/deleteStand/${id}`)
      .then(() => {
        toast.warn('Stand supprimé');
        setStands(stands.filter(stand => stand.id !== id)); // Mettre à jour la liste des stands après la suppression
      })
      .catch(error => {
        console.error("Erreur lors de la suppression du stand :", error);
      });
  };

  return (
    <Dash>
      <div className="stand-list-container">
        <ToastContainer />
       
        <button className="button-create" onClick={() => navigate(`/createStand`)}>Créer un stand</button>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={stands}
            columns={[
                { field: '_id', headerName: 'ID', width: 200 },
    { field: 'num', headerName: 'Numéro', width: 200 },
    { field: 'nom', headerName: 'Nom', width: 200 },
    { field: 'emplacement', headerName: 'Emplacement', width: 200 },
    { field: 'taille', headerName: 'Taille', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'etat', headerName: 'État', width: 200 },
    { field: 'prixLocation', headerName: 'Prix de location', width: 200 },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 200,
                renderCell: (params) => (
                  <>
                    <button className="buttonUpdate" onClick={() => navigate(`/updateStand/${params.row._id}`)}>Modifier</button>
                    <button className="buttonDelete" onClick={() => handleDelete(params.row._id)}>Supprimer</button>
                  </>
                )
              },
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

export default ListeStand1;
