import { useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/paiement/payer.css';
import Dash from '../dash-bord/Dash';

const Payment_admin = () => {
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

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paymentForm: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: '20px',
      border: '2px solid #FF007F',
      borderRadius: '8px',
      marginTop: '50px',
      width: '500px',
      maxWidth: '600px',
      marginLeft: '300px',
    },
    formSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
      width: '100%',
    },
    inputContainer: {
      marginBottom: '10px',
      width: '100%',
    },
    formInput: {
      background: 'transparent',
      border: 'none',
      borderBottom: '2px solid #FF007F',
      width: '100%',
      padding: '8px',
      color: 'white',
      marginBottom: '10px',
      outline: 'none',
    },
    formLabel: {
      marginBottom: '5px',
      color: 'white',
    },
    cardSelector: {
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    paymentIcon: {
      color: 'white',
      fontSize: '40px',
    },
    payButton: {
      width: '40%',
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: '#FF007F',
      color: 'white',
      cursor: 'pointer',
    },
  };

  return (
    <Dash>
      <div style={styles.container}>
        <div style={styles.paymentForm}>
          <h1>Paiement</h1>
          <ToastContainer />
          <form style={styles.formSection}>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>Numéro de carte :</label>
              <input
                style={styles.formInput}
                type="text"
                name="cardNumber"
                placeholder="Numéro de carte"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>Date d'expiration :</label>
              <input
                style={styles.formInput}
                type="text"
                name="expirationDate"
                placeholder="MM/AA"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>CVV :</label>
              <input
                style={styles.formInput}
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>Montant :</label>
              <input
                style={styles.formInput}
                type="text"
                name="amount"
                placeholder="Montant à payer"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.formLabel}>Date de paiement :</label>
              <input
                style={styles.formInput}
                type="date"
                name="paymentDate"
                value={new Date().toISOString().split('T')[0]}
                disabled
              />
            </div>
            <div style={styles.cardSelector}>
              <input
                type="radio"
                id="visa"
                name="cardType"
                value="visa"
                checked={selectedCard === 'visa'}
                onChange={handleCardChange}
              />
              <label htmlFor="visa">
                <FaCcVisa style={styles.paymentIcon} />
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
                <FaCcMastercard style={styles.paymentIcon} />
              </label>

              <input
                type="radio"
                id="paypal"
                name="cardType"
                value="paypal"
                checked={selectedCard
                    === 'paypal'}
                    onChange={handleCardChange}
                  />
                  <label htmlFor="paypal">
                    <FaCcPaypal style={styles.paymentIcon} />
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
                    <FaCcAmex style={styles.paymentIcon} />
                  </label>
                </div>
                <button style={styles.payButton} onClick={handleSubmit}>Payer</button>
              </form>
            </div>
          </div>
        </Dash>
      );
    };
    
    export default Payment_admin;
    