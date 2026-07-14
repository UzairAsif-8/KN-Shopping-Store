import { createContext, useContext } from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

const ThemeContext = createContext(null);

const theme = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  layout: LAYOUT,
};

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export default ThemeContext;
