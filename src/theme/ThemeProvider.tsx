import { FC, useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';

export const ThemeContext = createContext((_themeName: string): void => {});

const ThemeProviderWrapper: FC = (props) => {
  const chosenTheme = 'DarkSpacesTheme'
  const [themeName, _setThemeName] = useState(chosenTheme);

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || chosenTheme;
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);
  // console.log("theme: ",theme)
  const setThemeName = (themeName: string): void => {
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
