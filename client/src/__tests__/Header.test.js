import { render, screen } from '@testing-library/react'
import Header from '../components/Header';
import ThemeContext, { ThemeProvider } from '../context/ThemeContext';
import UserContext, { UserProvider } from '../context/UserContext';
import { BrowserRouter } from 'react-router-dom';

test("Header renders successfully", () => {
   const authUser = {
      authUser: {
         name: 'Test Name',
         username: 'testusername'
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
         <ThemeProvider>
            <UserProvider>
               <Header />
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>);

   const appTitle = screen.getByText("MyAuth");

   expect(appTitle).toBeInTheDocument();
})