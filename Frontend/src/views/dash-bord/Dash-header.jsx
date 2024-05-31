import '../dash-bord/Dash-style/dash.css';
import profil from '../../image/profil.png';

import { Space } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem("userData"))

function DashHeader() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    toast.warn("Vous étes déconnecté ! ")
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  return (
    <div className="dash-Header" >
      <ToastContainer />
      <img width={50} src={profil} alt="profil" />
      <h1 style={{ color: '#f0f0f0', textAlign: 'center', marginBottom: '30px', fontSize: '32px', marginTop: '15px' }}>Bienvenue sur votre Dashboard !</h1>


      <Space>

        {
          !user ? <button
            onClick={() => { window.location.href = "/login_admin"; }}
            className="login-button"
            style={{
              backgroundColor: '#87ceeb',
              color: '#305377',
              width: '100%',
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Se connecter
          </button> : <button
            onClick={() => { handleLogout() }}
            className="login-button"
            style={{
              backgroundColor: 'red',
              color: 'white',
              width: '100%',
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Déconnection
          </button>
        }






      </Space>
    </div>
  );
}

export default DashHeader;
