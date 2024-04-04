import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = (props) => {
  const cookie = Cookies.get("defaultTheme");
  const defaultTheme = cookie ? JSON.parse(cookie) : {
    isDarkMode: false,
    accentColor: '#63537d',
    fontPercentage: 100
  }
  const [isDarkMode, setIsDarkMode] = useState(defaultTheme.isDarkMode);
  const [accentColor, setAccentColor] = useState(defaultTheme.accentColor);
  const [fontPercentage, setFontPercentage] = useState(defaultTheme.fontPercentage);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    document.body.style.fontSize = `${fontPercentage}%`;

    const theme = {
      isDarkMode,
      accentColor,
      fontPercentage,
    };
    Cookies.set("defaultTheme", JSON.stringify(theme));
  }, [isDarkMode, fontPercentage, accentColor]);

  const toggleDarkMode = () => {
    setIsDarkMode(currentMode => !currentMode);
  }

  return (
    <ThemeContext.Provider value={{
      accentColor,
      isDarkMode,
      fontPercentage,
      actions: {
        toggleDarkMode,
        updateAccentColor: setAccentColor,
        updateFontPercentage: setFontPercentage
      }
    }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;