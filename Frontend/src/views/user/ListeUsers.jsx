import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '../../util/DateConvertor';

function ListeUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
        // Gérer la suppression de l'utilisateur ici
        console.log('Utilisateur supprimé avec succès');
        toast.warn("stand supprimer  avec succes ") 
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      });
  }

  return (
    <div>
      <h1>ListeUsers</h1>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <div>
                <div>
                  <strong>username:</strong> {user.username}
                </div>
                <div>
                  <strong>lastname:</strong> {user.lastname}
                </div>
                <div>
                  <strong>dateNaissance:</strong> {formatDate(user.dateNaissance)}
                </div>
                <div>
                  <strong>email:</strong> {user.email}
                </div>
                <button className="button" onClick={() => navigate(`/updateUser/${user._id}`)}>Update</button>
                <button className="button" onClick={() => handleDelete(user._id)}>Delete</button>
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

export default ListeUsers;
