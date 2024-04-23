import  { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../util/DateConvertor';
import { useParams } from 'react-router-dom';
import "../../style/evenement/UpdateEvent.css";

function UpdateEvent() {
  
  const [events, setEvent] = useState({ titre: '', date_debut: '', date_fin: '', description: '' } );
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

  
const handleGetEventData =async(id)=>
{axios.get(`http://localhost:5000/api/event/listeEvent/${id}`,events)
.then(result =>{setEvent(result.data.data)})


};


const handleUpdateEvent = ()=>{
  axios.put(`http://localhost:5000/api/event/updateEvent/${id}`, events)
  console.log('update sucess')
  console.log(events)

}




useEffect(() => {
  handleGetEventData(id);
}, []);







  return (
    <div className="update-event-container">
      <h1 className="update-event-title">Modifier l'événement</h1>
      
      <form className="update-event-form">

        <div className="update-event-form-group">
          <label className="update-event-form-label" >Titre:</label>
          <input className="update-event-form-input" type="text" name="" id="" value={events?.titre} 
          onChange={e => setEvent({ ...events,titre:e.target.value })} />
        </div>

        <div className="update-event-form-group">
          <label className="update-event-form-label" htmlFor="ID_Date_debut">Date de début:</label>
          <input className="update-event-form-input" value={formatDate(events?.date_debut)} type="Date" name="" id=""  onChange={e => setEvent({ ...events, date_debut: e.target.value })} />
        </div>

        <div className="update-event-form-group">
          <label className="update-event-form-label" htmlFor="ID_Date_fin">Date de fin:</label>
          <input className="update-event-form-input" type="Date" name="" id="" value={formatDate(events?.date_fin)} onChange={e => setEvent({ ...events, date_fin: e.target.value })} />
        </div>

        <div className="update-event-form-group">
          <label className="update-event-form-label" htmlFor="ID_description">Description:</label>
          <textarea className="update-event-form-textarea" name="" id="" value={events?.description} onChange={e => setEvent({ ...events, description: e.target.value })}></textarea>
        </div>

        <button className="update-event-form-button" onClick={handleUpdateEvent} type="button">Mettre à jour</button>
      </form>
    </div>
  );


}

export default UpdateEvent;