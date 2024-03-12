import { useState, useMemo } from 'react'; // Importation des hooks useState et useMemo depuis React
import TopBar from './TopBar'; // Importation du composant TopBar
import SideBar from './SideBar'; // Importation du composant SideBar
import { ThemeProvider } from '@mui/material/styles'; // Importation du ThemeProvider depuis Material-UI
import { createTheme } from '@mui/material/styles'; // Importation de la fonction createTheme depuis Material-UI
import { getDesignTokens } from '../../theme/Theme'; // Importation de la fonction getDesignTokens depuis un fichier de thème


function Dashboard() {
  // Déclaration des états open et mode à l'aide de useState
  const [open, setOpen] = useState(false);
  //const [mode, setMode] = useState(boolean(localStorage.getItem('currentMode')) ? localStorage.getItem('currentMode') : 'light');
  const [mode, setMode] = useState(localStorage.getItem('currentMode') || 'light');



  // Fonction pour ouvrir le tiroir
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Fonction pour fermer le tiroir
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Création du thème en fonction du mode sélectionné
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      {/* Fourniture du thème aux composants enfants à l'aide du ThemeProvider */}
      <ThemeProvider theme={theme}>

        {/* Affichage du composant TopBar avec les props open, handleDrawerOpen et setMode */}
        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} />

        {/* Affichage du composant SideBar avec les props open, handleDrawerClose et setMode */}
        <SideBar open={open} handleDrawerClose={handleDrawerClose} setMode={setMode} />
      </ThemeProvider>
    </>
  );
}

export default Dashboard; 
