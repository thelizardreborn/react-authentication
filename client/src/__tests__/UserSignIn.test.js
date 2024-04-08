import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UserProvider } from '../context/UserContext';
import { ThemeProvider } from '../context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import UserSignIn from '../components/UserSignIn';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedNavigate,
}));

afterEach(() => {
   jest.restoreAllMocks();
 });

test("User signin renders successfully", () => {
   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <UserSignIn />
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>);

   const usernameInput = screen.getByRole("textbox", { id: "username" });
   const passwordInput = screen.getByRole("textbox", { id: "password" });

   expect(usernameInput).toBeInTheDocument();
   expect(passwordInput).toBeInTheDocument();
});

test("User signin cancelled successfully", async () => {
   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <UserSignIn />
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>);

   const cancel = screen.getByTestId("cancelButton");
   fireEvent.click(cancel);

   await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/");
   });
})

test("User signin submitted successfully", async () => {
   const name = 'Test Name';
   const username = 'testusername';

   const mockResponse = {
      name,
      username,
   };

   jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponse),
   })


   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <UserSignIn />
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>);

   const signinButton = screen.getByTestId("signInButton");
   fireEvent.click(signinButton);

   // console.log(history);
   // expect(history.location.pathname).toBe('/authenticated');
   await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/authenticated");
   });
})

test("User signin bad credentials", async () => {
   ;
   const mockResponse = {
      message: "Access denied"
   };

   jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 401,
      json: jest.fn().mockResolvedValue(mockResponse),
   })


   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <UserSignIn />
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>);

   const signinButton = screen.getByTestId("signInButton");
   fireEvent.click(signinButton);

   await waitFor(() => {
      const errorDisplay = screen.getByText("Sign in was unsuccessful");
      expect(errorDisplay).toBeInTheDocument();
   });
})

test("User signin server error", async () => {
   jest.spyOn(global, 'fetch').mockImplementation(() => {
      throw new Error('test error handling');
   })


   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <UserSignIn />
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>);

   const signinButton = screen.getByTestId("signInButton");
   fireEvent.click(signinButton);

   await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/error");
   });
})