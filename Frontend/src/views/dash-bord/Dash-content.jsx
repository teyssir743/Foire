import { Routes, Route } from "react-router-dom";
import '../dash-bord/Dash-style/dash.css';
import DashRoutes from './Dash-routes';


function DashContent() {
  return (
    <div>
      <Routes>
        
          <Route path="/dash" element={<DashRoutes />} />
       
      
      </Routes>
    </div>
  );
}

export default DashContent;
