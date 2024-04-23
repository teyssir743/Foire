
import  { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Box, Stack } from '@mui/material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined'; // Import de l'icône pour le mode sombre
import Brightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined';


import { styled, alpha } from '@mui/material/styles';

import PropTypes from 'prop-types';


const drawerWidth = 240;

TopBar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired, // Validation de type pour la prop 'setMode'
 

};




// StyledAppBar pour personnaliser la barre de navigation supérieure
const StyledAppBar = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));




// Wrapper pour la zone de recherche avec une icône de recherche
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));



// Wrapper pour l'icône de recherche
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Personnalisation de l'entrée de recherche
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




 


function TopBar({ open, handleDrawerOpen}) {
  const [mode, setMode] = useState('light');

// Fonction pour basculer entre le mode sombre et le mode clair
const toggleMode = () => {
  setMode(mode === 'light' ? 'dark' : 'light');
};


  return (
    <StyledAppBar position="fixed" open={open}>

      <Toolbar>


        {/* Bouton du menu déroulant */}
        {!open && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            active="true"
            edge="start"
            sx={{ marginRight: 5 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        

        {/* Titre de l'application */}
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>


        {/* Zone de recherche */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>


        {/* Espacement flexible pour pousser les éléments à droite */}
        <Box flexGrow={1}></Box>

       
        <IconButton
          color="inherit"
          aria-label="toggle mode"
          onClick={toggleMode}
        
        >
           {/* Utilisez une icône pour représenter le mode sombre/clair */}
           {mode === 'light' ? <Brightness4OutlinedIcon /> : <Brightness7OutlinedIcon />}
        
        </IconButton>



        {/* Stack d'icônes pour les actions de l'utilisateur horizontale  */}
        <Stack direction="row">

          {/* profil
          */ }
          <IconButton color="inherit" active="true">
            <Person2OutlinedIcon />
          </IconButton>


          {/* notification */ }
          <IconButton color="inherit" active="true">
            <NotificationsOutlinedIcon />
          </IconButton>



          {/* Boutons supplémentaires  parametree*/}
          <IconButton color="inherit" active="true">
            <SettingsOutlinedIcon />
          </IconButton>


          {/* Boutons supplémentaires  help */}
          <IconButton color="inherit" active="true">
            <HelpOutlineOutlinedIcon />
          </IconButton>


        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}

export default TopBar;