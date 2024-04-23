import React, { useState } from 'react';
import axios from 'axios';
import "../../style/foire/CreateFoire.css";
function CreateFoire() {
    const [foire, setFoire] = useState({
        nom: '',
        lieu: '',
        dateDebut: '',
        dateFin: '',
        description: '',
        organisateur: '',
        statut: 'en attente'
    });

    const handleChange = (e) => {
        setFoire({ ...foire, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/foire/createFoire', foire);
            // Ajouter une logique de redirection ou de confirmation ici si nécessaire
        } catch (error) {
            console.error('Error creating foire:', error);
        }
    };

    return (
        <div>
            <h2>Create Foire</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nom" value={foire.nom} onChange={handleChange} placeholder="Nom" required />
                <input type="text" name="lieu" value={foire.lieu} onChange={handleChange} placeholder="Lieu" required />
                <input type="date" name="dateDebut" value={foire.dateDebut} onChange={handleChange} required />
                <input type="date" name="dateFin" value={foire.dateFin} onChange={handleChange} required />
                <textarea name="description" value={foire.description} onChange={handleChange} placeholder="Description" required></textarea>
                <input type="text" name="organisateur" value={foire.organisateur} onChange={handleChange} placeholder="Organisateur" required />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateFoire;
