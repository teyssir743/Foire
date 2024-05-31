import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dash from '../dash-bord/Dash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function ListeReservation() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();


 const token = localStorage.getItem('token');

    let config = token && {
        headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
    };

  useEffect(() => {
    axios.get("http://localhost:5000/api/reservation/listeReservation1", config)
      .then(res => {
        console.log("Réponse de la requête :", res); // Consolez la réponse ici
        setReservations(res.data); // Assurez-vous que vous utilisez la bonne structure pour accéder aux données
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des réservations :", error);
      });
  }, []);

  
  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/reservation/deleteReservation/${id}`, config)
      .then(() => {
        console.log('Réservation supprimée avec succès');
        toast.warn("Réservation supprimée avec succès");
        // Actualiser la liste des réservations après la suppression
        setReservations(reservations.filter(reservation => reservation._id !== id));
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de la réservation :", error);
      });
  };


  


  return (
    <Dash>
      <div className="admin-list-container">
        <ToastContainer />
       
       
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={reservations.map(reservation => ({ ...reservation, id: reservation._id }))}
            columns={[
              { field: 'id', headerName: 'ID', width: 200 },
              { field: 'startDate', headerName: 'Date de début', width: 200 },
              { field: 'endDate', headerName: 'Date de fin', width: 200 },
              { field: 'stand', headerName: 'Stand', width: 200 },
              { field: 'event', headerName: 'Événement', width: 200 },
              
              {
                field: 'actions',
                headerName: 'Actions',
                width: 200,
                renderCell: (params) => (
                  <>
                  
                    <button className="buttonDelete" onClick={() => handleDelete(params.row.id)}>Supprimer</button>
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
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </div>
    </Dash>
  );
}

export default ListeReservation;