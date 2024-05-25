import { Routes, Route } from "react-router-dom";
import '../dash-bord/Dash-style/dash.css';
import Dash from "./Dash";


function DashContent() {
  return (
    <div className="dash-content">
      <Routes>
        
          <Route path="/dash" element={<Dash />} />
       
      
      </Routes>
    </div>
  );
}

export default DashContent;
