import { Menu } from 'antd';
import '../dash-bord/Dash-style/dash.css';
import { MailOutlined, DollarCircleOutlined, ScheduleFilled, CalendarFilled, ShopFilled, CalendarOutlined, TeamOutlined, ShopOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function DashSideMenu() {
  const navigate = useNavigate(); // Importation de la fonction navigate

  return (
    <div className="dash-Side-Menu">
      <Menu onClick={(item) => {
        navigate(item.key); // Utilisation de la fonction navigate
      }} items={[
        {
          label: "Tableau de bord",
          key: '/dash',
          icon: <AppstoreOutlined />
        },
        {
          label: "Admin",
          key: '/Admin',
          icon: <UserOutlined />
        },
        {
          label: "Exposant",
          key: '/exposant',
          icon: <TeamOutlined />
        },
        {
          label: "Foire",
          key: '/foire',
          icon: <ShopOutlined />
        },
        {
          label: "Événement",
          key: '/listeEvent',
          icon: <CalendarOutlined />
        },
        {
          label: "Stand",
          key: '/stand',
          icon: <ShopFilled />
        },
        {
          label: "Calendrier",
          key: '/calendrier',
          icon: <CalendarFilled />
        },
        {
          label: "Réservation",
          key: '/reservation',
          icon: <ScheduleFilled />
        },
        {
          label: "Paiement",
          key: '/payer',
          icon: <DollarCircleOutlined />
        },
        {
          label: "Invitation",
          key: '/invitation',
          icon: <MailOutlined />
        },
      ]}>
      </Menu>
    </div>
  );
}

export default DashSideMenu;
