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