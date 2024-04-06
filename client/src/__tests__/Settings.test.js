import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Settings from '../components/Settings';
import ThemeContext, { ThemeProvider } from '../context/ThemeContext';
import Cookie from 'js-cookie'


test("Settings renders successfully", () => {
   render(
      <ThemeProvider>
         <Settings />
      </ThemeProvider>
   );

   const darkModeSwitch = screen.getByRole("checkbox", {className: "darkMode-selector"});
   expect(darkModeSwitch).toBeInTheDocument();
});

test("Settings callbacks are called", () => {
   const defaultTheme = {
      isDarkMode: false,
      accentColor: '#63537d',
      fontPercentage: 100,
   }
   Cookie.get = jest.fn().mockImplementation(() => JSON.stringify(defaultTheme));

   render(
      <ThemeProvider>
         <Settings />
      </ThemeProvider>
   );

   expect(document.body).not.toHaveClass('dark');
   const darkModeSwitch = screen.getByRole("checkbox", {className: "darkMode-selector"});
   fireEvent.click(darkModeSwitch);
   expect(document.body).toHaveClass('dark');
});