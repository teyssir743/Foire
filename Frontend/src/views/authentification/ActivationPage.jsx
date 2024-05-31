import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ActivationCode() {
  const [activationCode, setActivationCode] = useState('');
  const navigate = useNavigate()
  const handleChange = (e) => {
    setActivationCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/activate', { code: activationCode })
      .then(result => {
        if (result.data.message) {
          toast.success(result.data.message);
          setTimeout(() => {
            navigate('/login')
          }, 2000);
        } else {
          toast.error(result.data.error);
        }
      })
      .catch(error => {
        console.error('Error during activation:', error);
        toast.error('Error during activation!');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 container_register ">
      <div className="bg-white p-8 rounded-lg shadow-md w-50">
        <h2 className="text-2xl font-bold text-center mb-4">Enter Activation Code</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h5 className='text-black'>Veuillez Saisir le code d'activation</h5>
          <input
            type="text"
            value={activationCode}
            onChange={handleChange}
            className="text-black border p-2 w-full rounded"
            placeholder="Activation Code"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-700"
          >
            Activate
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ActivationCode;
