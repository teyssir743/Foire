import React, { useState } from "react";
import "../../style/interfacExposant/payment.css";

function PaymentForm(props) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle payment here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name on Card
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Card Number
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </label>
      <label>
        Expiration Date
        <input
          type="text"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
        />
      </label>
      <label>
        CVV
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
      </label>
      <label>
        Amount
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button type="submit">Pay</button>
    </form>
  );
}

export default PaymentForm;