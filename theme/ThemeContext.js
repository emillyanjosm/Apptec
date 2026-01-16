// theme/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [isDark, setIsDark] = useState(false);
  
  const colors = {
    light: {
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#000000',
      textSecondary: '#666666',
      primary: '#368642',
      accent: '#088395',
      error: '#F44336',
      border: '#E0E0E0',
      card: '#FFFFFF',
      tabBar: '#FFFFFF',
      statusBar: 'dark-content',
    },
    dark: {
      background: '#121212',
      surface: '#1E1E1E',
      text: '#FFFFFF',
      textSecondary: '#AAAAAA',
      primary: '#4CAF50',
      accent: '#4FC3F7',
      error: '#EF5350',
      border: '#333333',
      card: '#242424',
      tabBar: '#1E1E1E',
      statusBar: 'light-content',
    }
  };
  
  const toggleTheme = () => setIsDark(!isDark);
  const currentColors = isDark ? colors.dark : colors.light;
  
  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      colors: currentColors, 
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};