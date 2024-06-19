import { useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/paiement/payer.css';
import TopBarHome from '../visiteur/TopBarHome';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  const [selectedCard, setSelectedCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);

  const [errors, setErrors] = useState({});

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

  const { userId, eventId } = useParams();

  const validate = () => {
    const newErrors = {};
    if (!cardNumber) newErrors.cardNumber = 'Numéro de carte est requis';
    if (!expirationDate) newErrors.expirationDate = 'Date d\'expiration est requise';
    if (!cvv) newErrors.cvv = 'CVV est requis';
    if (!amount) newErrors.amount = 'Montant est requis';
    if (!selectedCard) newErrors.selectedCard = 'Type de carte est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const paymentData = {
      selectedCard: selectedCard,
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: cvv,
      amount: amount,
      user: userId,
      event: eventId,
      paymentDate: paymentDate
    };

    const token = localStorage.getItem('token');

    let config = token && {
      headers: {
        Authorization: `Bearer ${token.replace(/"/g, '')}`
      }
    };

    axios.post("http://localhost:5000/api/paiement/createPaiement", paymentData, config)
      .then((response) => {
        console.log(response.data);
        toast.success("Paiement effectué avec succès !");
      })
      .catch((error) => {
        console.error(error);
        toast.error('Une erreur est survenue lors du paiement.');
      });
  };

  return (
    <div className="payment-page">
      <TopBarHome />
      <ToastContainer />
      <div className="payment-form text-black">
        <label htmlFor="cardNumber">Numéro de carte :</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="Numéro de carte"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        {errors.cardNumber && <span style={{ color: 'red' }}>{errors.cardNumber}</span>}

        <label htmlFor="expirationDate">Date d'expiration :</label>
        <input
          type="text"
          id="expirationDate"
          name="expirationDate"
          placeholder="MM/AA"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        {errors.expirationDate && <span style={{ color: 'red' }}>{errors.expirationDate}</span>}

        <label htmlFor="cvv">CVV :</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        {errors.cvv && <span style={{ color: 'red' }}>{errors.cvv}</span>}

        <label htmlFor="amount">Montant :</label>
        <input
          type="text"
          id="amount"
          name="amount"
          placeholder="Montant à payer"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && <span style={{ color: 'red' }}>{errors.amount}</span>}

        <label htmlFor="paymentDate">Date de paiement :</label>
        <input
          type="date"
          id="paymentDate"
          name="paymentDate"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
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
        {errors.selectedCard && <span style={{ color: 'red' }}>{errors.selectedCard}</span>}

        <button className='text-white border border-black px-4 bg-green-600' type="button" onClick={handleSubmit}>Payer</button>
      </div>
    </div>
  );
};

export default PaymentPage;
