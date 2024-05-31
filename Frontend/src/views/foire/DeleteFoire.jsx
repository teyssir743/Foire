import React from 'react';
import axios from 'axios';
import "../../style/foire/DeleteFoire.css";
function DeleteFoire({ id }) {
    const token = localStorage.getItem('token');

    let config = token && {
        headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/foire/deleteFoire/${id}`, config);
            // Ajouter une logique de confirmation ici si nécessaire
        } catch (error) {
            console.error('Error deleting foire:', error);
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default DeleteFoire;
