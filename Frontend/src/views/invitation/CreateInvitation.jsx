import  { useState } from 'react';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateInvitation() {
    const [invitation, setInvitation] = useState({
        invité: '',
        événement: '',
        statut: 'en attente' // Par défaut, en attente
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvitation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/invitation/createInvitation', invitation)
            .then(response => {
                console.log('Invitation créée avec succès:', response.data);
                toast.success('Invitation créée avec succès');
                // Afficher un message de réussite ou rediriger l'utilisateur vers une autre page
            })

            .catch(error => {
                console.error('Erreur lors de la création de l\'invitation:', error);
                toast.error('Erreur lors de la création de l\'invitation');
                // Afficher un message d'erreur à l'utilisateur
            });
    };

    return (

        <div>
            <ToastContainer/>
        <h2>Créer une invitation</h2>
        <form >
            <label>Invité:</label>
            <input type="text" name="invité"  onChange={e =>setInvitation({...invitation,invité:e.target.value})} />
            <br />

            <label>Événement:</label>
            <input type="text" name="événement" onChange={e =>setInvitation({...invitation,événement:e.target.value})} />
            <br />
            <label>Date de création:</label>
                <input type="date" name="dateCréation"  onChange={e =>setInvitation({...invitation,dateCréation:e.target.value})}/>
                <br />

                <label>Statut:</label>
               
                <br />


            <button type="submit" onClick={handleSubmit}>Créer invitation</button>
        </form>
    </div>
);
  
}


export default CreateInvitation