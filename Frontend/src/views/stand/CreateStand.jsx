import React , { useState }from 'react'
import axios from 'axios';
import'../../style/stand/createStand.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast , ToastContainer} from 'react-toastify';


function CreateStand() {
    const [stand, setStand] = useState(null);

    
   
   
    const handleCreateStand = (e) => {
        e.preventDefault()
        console.log(stand)
        axios.post("http://localhost:5000/api/stand/createStand", stand)
            .then(() => {
                toast.success("Stand ajouté avec succès !");
            })
            .catch(() => {
                toast.error('Quelque chose a mal tourné ! ');
            })
    }
 
    
    
    return (
        <form className="create-stand">
            
            <ToastContainer />
            <h1>create Stand</h1>
            <label>
                Nom:
                <input type="text" name="" onChange={e =>setStand({...stand,nom:e.target.value})}/>
            </label>
            <br/>
            <label>
                Emplacement:
                <input type="text" name=""  onChange={e =>setStand({...stand,emplacement:e.target.value})}/>
            </label>
            <br/>
            <label>
                Taille:
                <input type="text" name=""  onChange={e =>setStand({...stand,taille:e.target.value})}/>
            </label>
            <br/>
            <label>
                État:
                <select name="" onChange={e =>setStand({...stand,etat:e.target.value})}>
                    <option value="réservé">Réservé</option>
                    <option value="confirmé">Confirmé</option>
                    <option value="installé">Installé</option>
                    <option value="démonté">Démonté</option>
                </select>
            </label>
            <br/>
            <label>
                Exposant:
                <input type="text" name="" onChange={e =>setStand({...stand,exposant:e.target.value})} />
            </label>
            <br/>
            <label>
                Description:
                <textarea name="" type="text" onChange={e =>setStand({...stand,description:e.target.value})} />
            </label>
            <br/>
            <label>
                Prix de location:
                <input type="number" name="" onChange={e =>setStand({...stand,prixLocation:e.target.value})} />
            </label>
    
            <br/>
            <label>
                Date de réservation:
                <input type="date" name="" onChange={e =>setStand({...stand,dateReservation:e.target.value})}/>
            </label>
            <br/>
            <label>
                Date d'installation:
                <input type="date" name="" onChange={e =>setStand({...stand,dateInstallation:e.target.value})} />
            </label>
            <br/>
            <label>
                Date de démontage:
                <input type="date" name="" onChange={e =>setStand({...stand,dateDemontage:e.target.value})}/>
            </label>
            <br/>
            <label>
                Commentaires:
                <textarea type="text" name="" onChange={e =>setStand({...stand,commentaires:e.target.value})}/>
            </label>
            <br/>
            <label>
                Services supplémentaires:
                <textarea type="text"name="" onChange={e =>setStand({...stand,service:e.target.value})}/>
                
               
            </label>
            

            <button type="submit" onClick={(e)=>handleCreateStand(e)}>Créer Stand</button>
        </form>
    );
}

export default CreateStand