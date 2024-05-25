import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function UpdateAdmin() {
  const [admin, setAdmin] = useState({ username: '', email: '', password: '' });
  const { id } = useParams();

  const handleGetAdminData = () => {
    axios.get(`http://localhost:5000/api/admin/listeAdmin/${id}`)
      .then(response => {
        setAdmin(response.data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données de l'administrateur :", error);
      });
  };

  const handleUpdateAdmin = () => {
    axios.put(`http://localhost:5000/api/admin/updateAdmin/${id}`, admin)
      .then(() => {
        console.log('Administrateur mis à jour avec succès');
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour de l'administrateur :", error);
      });
  };

  useEffect(() => {
    handleGetAdminData();
  }, []);

  return (
    <div className="update-admin-container">
      <h1 className="update-admin-title">Modifier l'administrateur</h1>
      <form className="update-admin-form">
        <div className="update-admin-form-group">
          <label className="update-admin-form-label">Nom d'utilisateur:</label>
          <input className="update-admin-form-input" type="text" value={admin.username} onChange={e => setAdmin({ ...admin, username: e.target.value })} />
        </div>
        <div className="update-admin-form-group">
          <label className="update-admin-form-label">Email:</label>
          <input className="update-admin-form-input" type="email" value={admin.email} onChange={e => setAdmin({ ...admin, email: e.target.value })} />
        </div>
        <div className="update-admin-form-group">
          <label className="update-admin-form-label">Mot de passe:</label>
          <input className="update-admin-form-input" type="password" value={admin.password} onChange={e => setAdmin({ ...admin, password: e.target.value })} />
        </div>
        <button className="update-admin-form-button" onClick={handleUpdateAdmin} type="button">Mettre à jour</button>
      </form>
    </div>
  );
}

export default UpdateAdmin;
