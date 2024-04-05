import { render, screen } from '@testing-library/react'
import Header from '../components/Header';
import ThemeContext from '../context/ThemeContext';
import UserContext from '../context/UserContext';
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
         <ThemeContext.Provider value={defaultTheme}>
            <UserContext.Provider value={authUser}>
               <Header />
            </UserContext.Provider>
         </ThemeContext.Provider>
      </BrowserRouter>);

   const appTitle = screen.getByText("MyAuth");

   expect(appTitle).toBeInTheDocument();
})