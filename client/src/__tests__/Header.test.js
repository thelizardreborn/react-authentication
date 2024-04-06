import { render, screen } from '@testing-library/react'
import Header from '../components/Header';
import { ThemeProvider } from '../context/ThemeContext';
import { UserProvider } from '../context/UserContext';
import { BrowserRouter } from 'react-router-dom';

test("Header renders successfully", () => {
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