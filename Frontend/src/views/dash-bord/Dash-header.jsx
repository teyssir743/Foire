import '../dash-bord/Dash-style/dash.css';
import profil from '../../image/profil.png';

import {  Space} from 'antd';

function DashHeader() {
  return (
    <div className="dash-Header" >  
      <img width={50} src={profil} alt="profil" />
      <h1 style={{ color: '#f0f0f0', textAlign: 'center', marginBottom: '30px', fontSize: '32px' , marginTop:'15px' }}>Bienvenue sur votre Dashboard !</h1>


      <Space>
        {/* Bouton Se connecter */}
        <button 
    onClick={() => { window.location.href = "/login_admin"; }} // Redirection vers /login_admin
    className="login-button" 
    style={{ 
        backgroundColor: '#87ceeb', 
        color: '#305377', 
        width: '100%', // Largeur à 100% pour remplir le conteneur parent
        padding: '10px', // Ajout de marge interne
        border: 'none', // Suppression de la bordure
        borderRadius: '4px', // Coins arrondis
        cursor: 'pointer' // Curseur pointer pour indiquer l'interactivité
    }}
>
    Se connecter
</button>


     
      </Space>
    </div>
  );
}

export default DashHeader;
