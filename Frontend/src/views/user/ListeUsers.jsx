import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Dash from '../dash-bord/Dash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../../style/user/listeUser.css';

function ListeUsers() {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('Exposant'); // État pour le rôle sélectionné
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
  };

  const handleChangeRole = (id, role) => {
    axios.put(`http://localhost:5000/api/user/changeRole/${id}`, { role })
      .then(() => {
        console.log(id);
        // Mettre à jour localement le rôle de l'utilisateur
        const updatedUsers = users.map(user =>
          user.id === id ? { ...user, role } : user
        );
        console.log(id);
        setUsers(updatedUsers);
        setSelectedRole(role); // Mettre à jour l'état selectedRole avec le nouveau rôle
        toast.success("Rôle de l'utilisateur modifié avec succès");
      })
      .catch(error => {
        console.error("Erreur lors du changement de rôle de l'utilisateur :", error);
      });
  };

  return (
    <Dash>
      <div>
        
        <ToastContainer />
        {users.length > 0 ? (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={[
                { field: 'id', headerName: 'ID', width: 200 },
                { field: 'username', headerName: 'Username', width: 200},
                { field: 'lastname', headerName: 'Lastname', width: 200 },
                { field: 'email', headerName: 'Email', width: 200 },
                {
                  field: 'actions',
                  headerName: 'Actions',
                  width: 500,
                  renderCell: (params) => (
                    <>
                      <button className="update-button" onClick={() => navigate(`/updateUser/${params.row._id}`)}>Update</button>
                      <button className="delete-button" onClick={() => handleDelete(params.row._id)}>Delete</button>
                      {/* Afficher le menu déroulant pour changer de rôle */}
                      <select value={selectedRole} onChange={(e) => handleChangeRole(params.row._id, e.target.value)}>
                        <option value="Exposant">Exposant</option>
                        <option value="Admin">Admin</option>
                        
                      </select>
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
