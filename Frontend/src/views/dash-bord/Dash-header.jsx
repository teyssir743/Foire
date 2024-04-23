import '../dash-bord/Dash-style/dash.css';
import profil from '../../image/profil.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons';
import { Badge, Space, Typography } from 'antd';

function DashHeader() {
  return (
    <div className="dash-Header">  
      <img width={40} src={profil} alt="profil" />
      <Typography.Title>Dashbord</Typography.Title>
      <Space>
        {/* Message Icon */}
        <Badge count={20} dot>
          <FontAwesomeIcon icon={faEnvelope} style={{ marginRight:'5px' }} />
        </Badge>
        {/* Notification Icon */}

       <Badge count={5} >
        <FontAwesomeIcon icon={faBell} />
        </Badge>
        
      </Space>
      
    </div>
  );
}

export default DashHeader;
