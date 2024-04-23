import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function ListeUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fonction pour formater la date au format DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; // Si la date est manquante, retourner 'N/A'
  
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Jour avec un zéro devant s'il est inférieur à 10
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois avec un zéro devant s'il est inférieur à 10
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`; // Format DD/MM/YYYY
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/user/listeUser")
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      });
  }, []);

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/user/deleteUser/${id}`)
      .then(() => {
        console.log('Utilisateur supprimé avec succès');
        toast.warn("Utilisateur supprimé avec succès");
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      });
  }

  return (
    <div>
      <ToastContainer />
      <h1>ListeUsers</h1>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Lastname</th>
              <th>Date de Naissance</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username || 'N/A'}</td>
                <td>{user.lastname || 'N/A'}</td>
                <td>{user.dateNaissance ? formatDate(user.dateNaissance) : 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>
                  <button className="button" onClick={() => navigate(`/updateUser/${user._id}`)}>Update</button>
                  <button className="button" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>Le tableau est vide</h1>
      )}
    </div>
  );
}

export default ListeUsers;
