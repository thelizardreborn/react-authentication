import { render, screen } from '@testing-library/react';
import { UserProvider } from '../context/UserContext';
import Nav from '../components/Nav';
import { ThemeProvider } from '../context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

test("Nav anon renders successfully", () => {
   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <Nav />
            </UserProvider>
         </ThemeProvider>
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
      name,
      username
   }

   Cookie.get = jest.fn().mockImplementation(() => JSON.stringify(authUser));

   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <Nav />
            </UserProvider>
         </ThemeProvider>
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