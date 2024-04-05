import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Settings from '../components/Settings';
import ThemeContext from '../context/ThemeContext';


test("Settings renders successfully", () => {
   const defaultTheme = {
      isDarkMode: false,
      accentColor: '#63537d',
      fontPercentage: 100,
      actions: {
         toggleDarkMode: jest.fn(),
         updateAccentColor: jest.fn(),
         updateFontPercentage: jest.fn()
      }
   }

   render(
      <ThemeContext.Provider value={defaultTheme}>
         <Settings />
      </ThemeContext.Provider>
   );

   const darkModeSwitch = screen.getByRole("checkbox", {className: "darkMode-selector"});
   expect(darkModeSwitch).toBeInTheDocument();
});