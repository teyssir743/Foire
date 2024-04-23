import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast , ToastContainer} from 'react-toastify';

function ListePaiements() {
  const [paiements, setPaiements] = useState([]);

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
        toast.warn("Paiement supprimé avec succès") 
        // Actualiser la liste des paiements après la suppression
        setPaiements(paiements.filter(paiement => paiement._id !== id));
      })
      .catch(error => {
        console.error("Erreur lors de la suppression du paiement :", error);
      });
  }

  return (
    <div>
      <ToastContainer/>
      <h1>Liste des paiements</h1>
      {paiements.length > 0 ? (
        <ul>
          {paiements.map(paiement => (
            <li key={paiement._id}>
              <div>
  <div className="payment-info">
    <div>
      <strong>Réservation ID:</strong> {paiement.reservationId}
    </div>
    <div>
      <strong>Montant:</strong> {paiement.amount}
    </div>
  
    <div>
      <strong>Date de paiement:</strong> {paiement.paymentDate}
    </div>
   
    <div>
      <strong>Numéro de carte:</strong> {paiement.cardNumber}
    </div>
    <div>
      <strong>Date d'expiration:</strong> {paiement.expirationDate}
    </div>
    <div>
      <strong>CVV:</strong> {paiement.cvv}
    </div>
    <div>
      <strong>Carte sélectionnée:</strong> {paiement.selectedCard}
    </div>
  </div>
  <button className="delete-button" onClick={() => handleDelete(paiement._id)}>Supprimer</button>
</div>

            </li>
          ))}
        </ul>
      ) : (
        <h1>Le tableau est vide</h1>
      )}
    </div>
  );
}

export default ListePaiements;
