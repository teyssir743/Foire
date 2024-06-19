import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, HomeOutlined, DollarCircleOutlined, ScheduleFilled, CalendarFilled, ShopFilled, CalendarOutlined, TeamOutlined, AppstoreOutlined, UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// Style CSS intégré
const styles = {
  sideMenuContainer: {
    marginTop: '10px', // Marge en haut
  },
  sideMenu: {
    backgroundColor: '#192a56', // Fond en bleu marin
    color: '#fff', // Couleur de texte en blanc
    border: '2px solid #fff', // Bordure blanche
    height: '2000px', // Hauteur de la barre latérale ajustée pour tenir compte de la marge en haut
  },
  icon: {
    fill: '#fff', // Couleur rose fuchsia pour les icônes
  },
  menuItem: {
    color: '#fff', // Couleur rose fuchsia pour le texte
  },
};

function DashSideMenu() {
  const navigate = useNavigate();

  const menuItems = [
   // { key: '/', icon: <HomeOutlined style={styles.icon} />, title: "Accueil" },
    { key: '/DashbordPage', icon: <AppstoreOutlined style={styles.icon} />, title: "Tableau de bord" },

    { key: '/listeUser', icon: <TeamOutlined style={styles.icon} />, title: "Exposant" },
    { key: '/listeEvent', icon: <CalendarOutlined style={styles.icon} />, title: "Événement" },
    { key: '/ListeStand1', icon: <ShopFilled style={styles.icon} />, title: "Stand" },
    { key: '/CalendrierDash', icon: <CalendarFilled style={styles.icon} />, title: "Calendrier" },
    { key: '/ListeReservation', icon: <ScheduleFilled style={styles.icon} />, title: "Réservation" },
    { key: '/ListeDePaiement', icon: <DollarCircleOutlined style={styles.icon} />, title: "Paiement" },
    { key: '/invitation', icon: <MailOutlined style={styles.icon} />, title: "Invitation" },
    { key: '/admin_profile', icon: <QuestionCircleOutlined style={styles.icon} />, title: "Profile" },
    { key: '/faq', icon: <QuestionCircleOutlined style={styles.icon} />, title: "FAQ" },
  ];

  return (
    <div style={styles.sideMenuContainer}>
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        style={styles.sideMenu}
      >
        {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon} style={styles.menuItem}>
            {item.title}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default DashSideMenu;
