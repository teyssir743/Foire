import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dash from '../dash-bord/Dash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function ListePaiements() {
  const [paiements, setPaiements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/paiement/listePaiement")
      .then(res => {
        setPaiements(res.data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des paiements :", error);
      });
  }, []);

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/paiement/deletePaiement/${id}`)
      .then(() => {
        console.log('Paiement supprimé avec succès');
        toast.warn("Paiement supprimé avec succès");
        // Actualiser la liste des paiements après la suppression
        setPaiements(paiements.filter(paiement => paiement._id !== id));
      })
      .catch(error => {
        console.error("Erreur lors de la suppression du paiement :", error);
      });
  };

  return (
    <Dash>
      <div >
        <ToastContainer />
       
        <button className="button-create" onClick={() => navigate(`/Payment_admin`)}>Créer un paiement</button>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={paiements.map(paiement => ({ ...paiement, id: paiement._id }))}
            columns={[
              { field: 'id', headerName: 'ID ', width: 200 },
              { field: 'amount', headerName: 'Montant', width: 200 },
              { field: 'paymentDate', headerName: 'Date de paiement', width: 200 },
              { field: 'cardNumber', headerName: 'Numéro de carte', width: 200 },
              { field: 'expirationDate', headerName: 'Date d\'expiration', width: 200 },
              { field: 'cvv', headerName: 'CVV', width: 200 },
              { field: 'selectedCard', headerName: 'Carte sélectionnée', width: 200 },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 200,
                renderCell: (params) => (
                  <>
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

export default ListePaiements;
