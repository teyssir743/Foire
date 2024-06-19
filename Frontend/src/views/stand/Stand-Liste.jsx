import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Dash from '../dash-bord/Dash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function ListeStand1() {
  const [stands, setStands] = useState([]);
  const navigate = useNavigate();


  const token = localStorage.getItem('token');

  let config = token && {
    headers: {
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    }
  };

  // Function to fetch stands from the backend
  const fetchStands = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stand/listeStand", config);
      // Add a unique id property to each stand
      const standsWithId = res.data.data.map((stand, index) => ({
        ...stand,
        id: index + 1 // Use a 1-based index or a unique identifier from the database
      }));
      setStands(standsWithId);
    } catch (error) {
      console.error("Erreur lors de la récupération des stands :", error);
    }
  };

  // Use useEffect to fetch stands when the component mounts
  useEffect(() => {
    fetchStands();
  }, []);

  // Function to delete a stand
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stand/deleteStand/${id}`, config);
      toast.warn('Stand supprimé');
      setStands(stands.filter(stand => stand._id !== id)); // Update the list of stands after deletion
    } catch (error) {
      console.error("Erreur lors de la suppression du stand :", error);
    }
  };

  // Function to update all stands to "available"
  const handleUpdateAllStands = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/stand/updateAllStandsAvailable', config);
      toast.success(response.data.msg);
      fetchStands(); // Refresh the list of stands after update
    } catch (error) {
      console.error('Erreur lors de la mise à jour des stands :', error);
      toast.error('Erreur lors de la mise à jour des stands.');
    }
  };

  return (
    <Dash>
      <div >
        <ToastContainer />
        <div style={{ marginTop: '3vh' }}>
          <button className="button-create" onClick={() => navigate(`/createStand`)}>Créer un stand</button>
          

        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={stands}
            columns={[
              { field: '_id', headerName: 'ID', width: 200},
              { field: 'num', headerName: 'Numéro', width: 50 },
              { field: 'nom', headerName: 'Nom', width: 100 },
              { field: 'emplacement', headerName: 'Emplacement', width: 100 },
              { field: 'taille', headerName: 'Taille', width: 100 },
              { field: 'description', headerName: 'Description', width: 300 },
              { field: 'etat', headerName: 'État', width: 100 },
              { field: 'prixLocation', headerName: 'Prix de location', width: 100 },
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
              Toolbar: GridToolbar, // Add GridToolbar
            }}
          />
        </div>
      </div>
    </Dash>
  );
}

export default ListeStand1;
