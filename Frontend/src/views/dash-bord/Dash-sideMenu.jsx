import { Menu } from 'antd';
import '../dash-bord/Dash-style/dash.css';
import { MailOutlined, DollarCircleOutlined, ScheduleFilled, CalendarFilled, ShopFilled, CalendarOutlined, TeamOutlined, ShopOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';


function DashSideMenu() {
  const navigate = useNavigate(); // Importation de la fonction navigate

  return (
    <div className="dash-Side-Menu">
      <Menu onClick={(item) => {
        navigate(item.key); // Utilisation de la fonction navigate
      }} items={[
        {
          label: "Tableau de bord",
          key: '/DashbordPage',
          icon: <AppstoreOutlined />
        },
        {
          label: "Admin",
          key: '/Admin',
          icon: <UserOutlined />
        },
        {
          label: "Exposant",
          key: '/listeUser',
          icon: <TeamOutlined />
        },
        {
          label: "Foire",
          key: '/listeFoire',
          icon: <ShopOutlined />
        },
        {
          label: "Événement",
          key: '/listeEvent',
          icon: <CalendarOutlined />
        },
        {
          label: "Stand",
          key: '/ListeStand',
          icon: <ShopFilled />
        },
        {
          label: "Calendrier",
          key: '/CalendrierDash',
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

        {
          label: "FAQ",
          key: '/faq',
          icon: <QuestionCircleOutlined />
        },
      ]}>
      </Menu>
    </div>
  );
}

export default DashSideMenu;
