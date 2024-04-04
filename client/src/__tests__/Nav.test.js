import { render, screen } from '@testing-library/react'
import UserContext from '../context/UserContext';
import Nav from '../components/Nav';
import ThemeContext from '../context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

test("Nav anon renders successfully", () => {
   const anonUser = {
      authUser: null,
      actions: {
         signIn: jest.fn(),
         signOut: jest.fn(),
      }
   }
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
      <BrowserRouter>
         <ThemeContext.Provider value={defaultTheme}>
            <UserContext.Provider value={anonUser}>
               <Nav />
            </UserContext.Provider>
         </ThemeContext.Provider>
      </BrowserRouter>);

   const welcome = screen.queryByText(`Welcome`);
   const signinLink = screen.getByText("Sign in");
   const signupLink = screen.getByText("Sign up");
   const settingsLink = screen.queryByText("Settings");
   const signoutLink = screen.queryByText("Sign out");

   expect(welcome).not.toBeInTheDocument();
   expect(settingsLink).not.toBeInTheDocument();
   expect(signoutLink).not.toBeInTheDocument();
   expect(signinLink).toBeInTheDocument();
   expect(signupLink).toBeInTheDocument();
});

test("Nav auth renders successfully", () => {
   const name = 'Test Name';
   const username = 'testusername';
   const authUser = {
      authUser: {
         name,
         username
      },
      actions: {
         signIn: jest.fn(),
         signOut: jest.fn(),
      }
   }
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
      <BrowserRouter>
         <ThemeContext.Provider value={defaultTheme}>
            <UserContext.Provider value={authUser}>
               <Nav />
            </UserContext.Provider>
         </ThemeContext.Provider>
      </BrowserRouter>);

   const welcome = screen.queryByText(`Welcome ${name}`);
   const signinLink = screen.queryByText("Sign in");
   const signupLink = screen.queryByText("Sign up");
   const settingsLink = screen.queryByText("Settings");
   const signoutLink = screen.queryByText("Sign out");

   expect(welcome).toBeInTheDocument();
   expect(settingsLink).toBeInTheDocument();
   expect(signoutLink).toBeInTheDocument();
   expect(signinLink).not.toBeInTheDocument();
   expect(signupLink).not.toBeInTheDocument();
})