import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../style/foire/UpdateFoire.css";
function UpdateFoire({ id }) {
    const [foire, setFoire] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/foire/listeFoire/${id}`)
            .then(response => {
                setFoire(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching foire:', error);
                setError('Error fetching foire. Please try again later.');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        setFoire({ ...foire, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/foire/updateFoire/${id}`, foire);
            // Ajouter une logique de redirection ou de confirmation ici si nécessaire
        } catch (error) {
            console.error('Error updating foire:', error);
        }
    };

    return (
        <div>
            <h2>Update Foire</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="nom" value={foire.nom} onChange={handleChange} placeholder="Nom" required />
                    <input type="text" name="lieu" value={foire.lieu} onChange={handleChange} placeholder="Lieu" required />
                    <input type="date" name="dateDebut" value={foire.dateDebut} onChange={handleChange} required />
                    <input type="date" name="dateFin" value={foire.dateFin} onChange={handleChange} required />
                    <textarea name="description" value={foire.description} onChange={handleChange} placeholder="Description" required></textarea>
                    <input type="text" name="organisateur" value={foire.organisateur} onChange={handleChange} placeholder="Organisateur" required />
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
}

export default UpdateFoire;
