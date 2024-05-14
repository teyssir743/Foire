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
                nom:
                <input type="text" name="" onChange={e =>setStand({...stand,nom:e.target.value})}/>
            </label>
            <br/>
            
            <label>
            numero:
                <input type="number" name=""  onChange={e =>setStand({...stand,numero:e.target.value})}/>
            </label>
            <br/>
            
            <label>
            emplacement:
                <input type="text" name=""  onChange={e =>setStand({...stand,emplacement:e.target.value})}/>
            </label>
            <br/>
            <label>
            taille:
                <input type="text" name=""  onChange={e =>setStand({...stand,taille:e.target.value})}/>
            </label>
            <br/>
            <label>
            etat:
                <select name="" onChange={e =>setStand({...stand,etat:e.target.value})}>
                    <option value="réservé">Réservé</option>
                    <option value="disponible">disponible</option>
           
                </select>
            </label>
            <br/>
          
            <label>
                prixLocation:
                <input type="number" name="" onChange={e =>setStand({...stand,prixLocation:e.target.value})} />
            </label>
    
            <br/>
        
               
            

            <button type="submit" onClick={(e)=>handleCreateStand(e)}>Créer Stand</button>
        </form>
    );
}

export default CreateStand