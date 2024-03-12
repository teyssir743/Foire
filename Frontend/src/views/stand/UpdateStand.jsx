
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../util/DateConvertor';
import { useParams } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function UpdateStand() {

    const [stand, setStand] = useState({
        nom: '',
        emplacement: '',
        taille: '',
        etat: 'réservé',
        exposant: '',
        description: '',
        prixLocation: 0,
        dateReservation: '',
        dateInstallation: '',
        dateDemontage: '',
        commentaires: '',
        service: ''
    });
    const {id} = useParams();


    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
      };
    
     
  
      const handleGetStandData = async (id) => {
          try {
              const result = await axios.get(`http://localhost:5000/api/stand/listeStand/${id}`);
              setStand(result.data.data);
          } catch (error) {
              console.error("Erreur lors de la récupération du stand :", error);
          }
      };
  
      useEffect(() => {
          handleGetStandData(id);
      }, []);
  

      const handleUpdateStand = (e) => {
        e.preventDefault()
          axios.put(`http://localhost:5000/api/stand/updateStand/${id}`, stand)
              .then(() => {
                  toast.success("Stand mis à jour avec succès"); 
                  console.log('Mise à jour réussie' , stand);
              })
              .catch(error => {
                  console.error("Erreur lors de la mise à jour du stand :", error);
              });
      }
  

  return (
    <div>
        <ToastContainer/> 
        <form className="create-stand">
            
           
            <h1>update Stand</h1>
            <label>
                Nom:
                <input type="text" name="" value={stand?.nom}onChange={e =>setStand({...stand,nom:e.target.value})}/>
            </label>
            <br/>
            <label>
                Emplacement:
                <input type="text" name="" value={stand?.emplacement} onChange={e =>setStand({...stand,emplacement:e.target.value})}/>
            </label>
            <br/>
            <label>
                Taille:
                <input type="text" name="" value={stand?.taille}  onChange={e =>setStand({...stand,taille:e.target.value})}/>
            </label>
            <br/>
            <label>
                État:
                <select name="" value={stand?.etat} onChange={e =>setStand({...stand,etat:e.target.value})}>
                    <option value="réservé">Réservé</option>
                    <option value="confirmé">Confirmé</option>
                    <option value="installé">Installé</option>
                    <option value="démonté">Démonté</option>
                </select>
            </label>
            <br/>
            <label>
                Exposant:
                <input type="text" value={stand?.exposant} name="" onChange={e =>setStand({...stand,exposant:e.target.value})} />
            </label>
            <br/>
            <label>
                Description:
                <textarea name="" value={stand?.description} type="text" onChange={e =>setStand({...stand,description:e.target.value})} />
            </label>
            <br/>
            <label>
                Prix de location:
                <input type="number" value={stand?.prixLocation} name="" onChange={e =>setStand({...stand,prixLocation:e.target.value})} />
            </label>
    
            <br/>
            <label>
                Date de réservation:
                <input type="date" name="" value={formatDate(stand?.dateReservation)} onChange={e =>setStand({...stand,dateReservation:e.target.value})}/>
            </label>
            <br/>
            <label>
                Date d'installation:
                <input type="date" name="" value={formatDate(stand?.dateInstallation)} onChange={e =>setStand({...stand,dateInstallation:e.target.value})} />
            </label>
            <br/>
            <label>
                Date de démontage:
                <input type="date" name="" value={formatDate(stand?.dateDemontage)} onChange={e =>setStand({...stand,dateDemontage:e.target.value})}/>
            </label>
            <br/>
            <label>
                Commentaires:
                <textarea type="text" name="" value={stand?.commentaires}onChange={e =>setStand({...stand,commentaires:e.target.value})}/>
            </label>
            <br/>
            <label>
                Services supplémentaires:
                <textarea type="text"name="" value={stand?.service} onChange={e =>setStand({...stand,service:e.target.value})}/>
               
            </label>
            

            <button type="submit"onClick={handleUpdateStand}>update Stand</button>
        </form>
    


    </div>
  )
}

export default UpdateStand