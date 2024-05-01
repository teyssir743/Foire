import  { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../util/DateConvertor';
import "../../style/evenement/ListeEvent.css";
import { toast , ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dash from '../dash-bord/Dash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function ListeEvent() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/event/listeEvent")
      .then(res => {
        // Ajouter une propriété id unique à chaque événement
        const eventsWithId = res.data.data.map((event, index) => ({
          ...event,
          id: index + 1 // Utilisez un index basé sur 1 ou un identifiant unique de la base de données
        }));
        setEvents(eventsWithId);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des événements :", error);
      });
  }, []);

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/event/deleteEvent/${id}`)
      .then(() => {
        toast.warn('Event supprimé');
        setEvents(events.filter(event => event.id !== id)); // Mettre à jour la liste des événements après la suppression
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'événement :", error);
      });
  };

  return (
    <Dash>
      <div className="event-list-container">
        <ToastContainer/>
       
        <button className="button-create" onClick={() => navigate(`/createEvent`)}>Créer un événement</button>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={events}
            columns={[
              //{ field: 'id', headerName: 'ID', width: 200 },
              { field: 'titre', headerName: 'Titre', width: 200 },
              { field: 'date_debut', headerName: 'Date de début', width: 200, valueFormatter: ({ value }) => formatDate(value) },
              { field: 'date_fin', headerName: 'Date de fin', width: 200, valueFormatter: ({ value }) => formatDate(value) },
              { field: 'description', headerName: 'Description', width: 200 },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 200,
                renderCell: (params) => (
                  <>
                    <button className="buttonUpdate" onClick={() => navigate(`/updateEvent/${params.row._id}`)}>Modifier</button>
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

export default ListeEvent;
