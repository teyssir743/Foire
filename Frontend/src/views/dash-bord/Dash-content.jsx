import { Routes, Route } from "react-router-dom";
import '../dash-bord/Dash-style/dash.css';
import DashRoutes from './Dash-routes';
import ListeEvent from '../event/ListeEvent';

function DashContent() {
  return (
    <div>
      <Routes>
        <Route path="/dash" element={<DashRoutes />} />
       
        <Route path='/listeEvent' element={ <ListeEvent/>}/>  
      
      
      </Routes>
    </div>
  );
}

export default DashContent;
