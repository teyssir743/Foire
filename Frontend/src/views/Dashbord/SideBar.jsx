
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PropTypes from 'prop-types';



const drawerWidth = 240;

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired, // Validation de type pour la prop 'setMode'
};


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});


const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({   
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));




// Composant SideBar avec les commentaires

function SideBar ({open , handleDrawerClose}){
  // Utilisation du hook useTheme pour accéder au thème actuel
  const theme = useTheme();
   
  // Rendu du composant SideBar
  return (


    // Utilisation du composant StyledDrawer pour personnaliser le tiroir latéral
    <StyledDrawer variant="permanent" open={open} >
      {/* Entête du tiroir avec un bouton pour fermer le tiroir */}
      <DrawerHeader>
        <IconButton  active="true" onClick={handleDrawerClose}>
          {/* Affichage de l'icône de fermeture du tiroir */}
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>


      {/* Séparateur entre l'en-tête et les éléments de la liste */}
      <Divider />

      
      {/* Liste des éléments de navigation dans le tiroir */}
      <List>


        {/* Élément de liste pour le tableau de bord */}
        <ListItemButton active="true">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Élément de liste pour les utilisateurs */}
        <ListItemButton active="true">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Utilisateurs" />
        </ListItemButton>

        {/* Élément de liste pour les événements */}
        <ListItemButton active="true">
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Événements" />
        </ListItemButton>


        {/* Élément de liste pour les exposants */}
        <ListItemButton active="true">
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Exposants" />
        </ListItemButton>


        {/* Élément de liste pour les catégories */}
        <ListItemButton active="true">
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Catégories" />
        </ListItemButton>


        {/* Élément de liste pour les produits */}
        <ListItemButton active="true">
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText primary="Produits" />
        </ListItemButton>


        {/* Élément de liste pour les commandes */}
        <ListItemButton active="true">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Commandes" />
        </ListItemButton>


        {/* Élément de liste pour les statistiques */}
        <ListItemButton active="true">
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Statistiques" />
        </ListItemButton>


        {/* Élément de liste pour le stand */}
        <ListItemButton active="true">
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Stand" />
        </ListItemButton>


        {/* Élément de liste pour les réservations */}
        <ListItemButton active="true">
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary="Réservation" />
        </ListItemButton>


        {/* Élément de liste pour les paramètres */}
        <ListItemButton active="true">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Paramètres" />
        </ListItemButton>


        {/* Élément de liste pour l'aide */}
        <ListItemButton active="true">
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Aide" />
        </ListItemButton>
      </List>
      
    </StyledDrawer>
  );
}

export default SideBar;

