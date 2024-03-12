// CustomThemeProvider.jsx
import  { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

const CustomThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

CustomThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useCustomTheme doit être utilisé à l\'intérieur de CustomThemeProvider');
  }
  return context;
};

export { CustomThemeProvider, useCustomTheme };
