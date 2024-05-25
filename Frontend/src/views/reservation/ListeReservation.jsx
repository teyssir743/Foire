import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dash from '../dash-bord/Dash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function ListeReservation() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/reservation/listeReservation1")
      .then(res => {
        setReservations(res.data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des réservations :", error);
      });
  }, []);

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/reservation/deleteReservation/${id}`)
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
       
        <button className="button-create" onClick={() => navigate(`/createReservation`)}>Créer une réservation</button>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={reservations.map(reservation => ({ ...reservation, id: reservation._id }))}
            columns={[
              { field: 'id', headerName: 'ID', width: 200 }, // Changer 'id' en 'ID'
              { field: 'name', headerName: 'Nom', width: 200 },
              { field: 'email', headerName: 'Email', width: 200 },
              { field: 'phone', headerName: 'Téléphone', width: 200 },
              { field: 'date', headerName: 'Date', width: 200 },
              { field: 'selectedStand', headerName: 'Stand', width: 200 },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 200,
                renderCell: (params) => (
                  <>
                    <button className="buttonDelete" onClick={() => handleDelete(params.row.id)}>Supprimer</button> {/* Utiliser params.row.id */}
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

export default ListeReservation;
