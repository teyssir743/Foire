import { useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/paiement/payer.css';


const PaymentPage = () => {
  const [selectedCard, setSelectedCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');

  // Gérer le changement de la carte sélectionnée
  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

  // Fonction pour envoyer le paiement au backend
  const handleSubmit = () => {
    // Créer un objet avec les données du formulaire
    const paymentData = {
      selectedCard,
      cardNumber,
      expirationDate,
      cvv,
      amount,
    };

    // Envoyer l'objet au backend via une requête POST
    axios.post("http://localhost:5000/api/paiement/createPaiement", paymentData)
      .then((response) => {
        // Gérer la réponse du backend si nécessaire
        console.log(response.data);
        toast.success("Paiement effectué avec succès !");
      })
      .catch((error) => {
        // Gérer les erreurs de requête ou de traitement
        console.error(error);
        toast.error('Une erreur est survenue lors du paiement.');
      });
  };

  return (
    
    <div className="payment-page">
      <ToastContainer />

      <div className="payment-form">
        <div className="payment-header">
          <h1>Paiement</h1>
        </div>

        <label htmlFor="cardNumber">Numéro de carte :</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="Numéro de carte"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <label htmlFor="expirationDate">Date d'expiration :</label>
        <input
          type="text"
          id="expirationDate"
          name="expirationDate"
          placeholder="MM/AA"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />

        <label htmlFor="cvv">CVV :</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />

        <label htmlFor="amount">Montant :</label>
        <input
          type="text"
          id="amount"
          name="amount"
          placeholder="Montant à payer"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Champ de date de paiement pré-rempli */}
        <label htmlFor="paymentDate">Date de paiement :</label>
        <input
          type="date"
          id="paymentDate"
          name="paymentDate"
          value={new Date().toISOString().split('T')[0]}
          disabled
        />

        <div className="card-selector">
          <input
            type="radio"
            id="visa"
            name="cardType"
            value="visa"
            checked={selectedCard === 'visa'}
            onChange={handleCardChange}
          />
          <label htmlFor="visa">
            <FaCcVisa className="payment-icon" />
          </label>

          <input
            type="radio"
            id="mastercard"
            name="cardType"
            value="mastercard"
            checked={selectedCard === 'mastercard'}
            onChange={handleCardChange}
          />
          <label htmlFor="mastercard">
            <FaCcMastercard className="payment-icon" />
          </label>

          <input
            type="radio"
            id="paypal"
            name="cardType"
            value="paypal"
            checked={selectedCard === 'paypal'}
            onChange={handleCardChange}
          />
          <label htmlFor="paypal">
            <FaCcPaypal className="payment-icon" />
          </label>

          <input
            type="radio"
            id="amex"
            name="cardType"
            value="amex"
            checked={selectedCard === 'amex'}
            onChange={handleCardChange}
          />
          <label htmlFor="amex">
            <FaCcAmex className="payment-icon" />
          </label>
        </div>

        <button type="button" onClick={handleSubmit}>Payer</button>
      </div>
    </div>
   
  );
};

export default PaymentPage;
