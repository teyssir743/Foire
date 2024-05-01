import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Dash from '../dash-bord/Dash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../../style/user/listeUser.css';

function ListeUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fonction pour formater la date au format DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; // Si la date est manquante, retourner 'N/A'

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Jour avec un zéro devant s'il est inférieur à 10
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois avec un zéro devant s'il est inférieur à 10
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Format DD/MM/YYYY
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/user/listeUser")
      .then(res => {
        // Ajout de la propriété 'id' à chaque objet utilisateur
        const usersWithIds = res.data.data.map((user, index) => ({
          ...user,
          id: index + 1 // Utilisation de l'index du tableau + 1 comme ID
        }));
        setUsers(usersWithIds);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      });
  }, []);

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/user/deleteUser/${id}`)
      .then(() => {
        console.log('Utilisateur supprimé avec succès');
        toast.warn("Utilisateur supprimé avec succès");
        setUsers(users.filter(user => user.id !== id)); // Filtrer en utilisant l'ID
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      });
  }

  return (
    <Dash>
      <div>
        <ToastContainer />
        <button className='create-user'>create User</button>
        {users.length > 0 ? (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={[
                { field: 'id', headerName: 'ID', width: 200 },
                { field: 'username', headerName: 'Username', width: 200},
                { field: 'lastname', headerName: 'Lastname', width: 200 },
                { field: 'dateNaissance', headerName: 'Date de Naissance', width: 200, valueGetter: (params) => formatDate(params.value) },
                { field: 'email', headerName: 'Email', width: 200 },
                {
                  field: 'actions',
                  headerName: 'Actions',
                  width: 200,
                  renderCell: (params) => (
                    <>
                      <button className="update-button" onClick={() => navigate(`/updateUser/${params.row._id}`)}>Update</button>
                      <button className="delete-button" onClick={() => handleDelete(params.row._id)}>Delete</button>
                    </>
                  )
                },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              autoHeight
              components={{
                Toolbar: GridToolbar, // Ajout de GridToolbar
              }}
            />
          </div>
        ) : (
          <h1>Le tableau est vide</h1>
        )}
      </div>
    </Dash>
  );
}

export default ListeUsers;
