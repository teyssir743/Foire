import { createTheme } from '@mui/material/styles';


export const getDesignTokens = (mode) => {
  const isLightMode = mode === 'light';

  // Définir les couleurs de la palette
  const primaryColor = isLightMode ? '#1976d2' : '#2196f3'; // Bleu pour le thème clair et sombre
  const secondaryColor = isLightMode ? '#ff9100' : '#ffab40'; // Orange pour le thème clair et sombre
  const backgroundColor = isLightMode ? '#f5f5f5' : '#303030'; // Couleur de fond pour le thème clair et sombre
  const textColor = isLightMode ? '#212121' : '#f5f5f5'; // Couleur du texte pour le thème clair et sombre

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: backgroundColor,
        paper: isLightMode ? '#fff' : '#424242', // Couleur du papier pour le thème clair et sombre
      },
      text: {
        primary: textColor,
        secondary: isLightMode ? '#757575' : '#bdbdbd', // Couleur du texte secondaire pour le thème clair et sombre
      },
    },
  });
};
