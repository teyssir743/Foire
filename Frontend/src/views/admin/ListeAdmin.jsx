import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dash from '../dash-bord/Dash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import UpdateAdmin from './UpdateAdmin'; // Assurez-vous que le chemin d'importation est correct

function ListeAdmin() {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/listeAdmin")
      .then(res => {
        // Ajouter une propriété id unique à chaque administrateur
        const adminsWithId = res.data.data.map((admin, index) => ({
          ...admin,
          id: index + 1 // Utilisez un index basé sur 1 ou un identifiant unique de la base de données
        }));
        setAdmins(adminsWithId);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des administrateurs :", error);
      });
  }, []);

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/admin/deleteAdmin/${id}`)
      .then(() => {
        toast.warn('Administrateur supprimé');
        setAdmins(admins.filter(admin => admin.id !== id)); // Mettre à jour la liste des administrateurs après la suppression
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'administrateur :", error);
      });
  };

  return (
    <Dash>
      <div className="admin-list-container">
        <ToastContainer />
       
        <button className="button-create" onClick={() => navigate(`/Admin`)}>Créer un administrateur</button>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={admins}
            columns={[
              { field: 'username', headerName: 'Nom d\'utilisateur', width: 200 },
              { field: 'email', headerName: 'Email', width: 200 },
              { field: 'createdAt', headerName: 'Date de création', width: 200, valueFormatter: ({ value }) => new Date(value).toLocaleDateString() },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 200,
                renderCell: (params) => (
                  <>
                    <button className="buttonUpdate" onClick={() => navigate(`/UpdateAdmin/${params.row._id}`)}>Modifier</button>
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

export default ListeAdmin;
