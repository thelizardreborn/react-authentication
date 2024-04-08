import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UserProvider } from '../context/UserContext';
import { ThemeProvider } from '../context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import UserSignUp from '../components/UserSignUp';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedNavigate,
}));

test("User signup renders successfully", () => {
   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <UserSignUp />
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>);

   const nameInput = screen.getByTestId("nameInput");
   const usernameInput = screen.getByTestId("usernameInput");
   const passwordInput = screen.getByTestId("passwordInput");

   expect(nameInput).toBeInTheDocument();
   expect(usernameInput).toBeInTheDocument();
   expect(passwordInput).toBeInTheDocument();
});

test("User signup cancelled successfully", async () => {
   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <UserSignUp />
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>);

   const cancel = screen.getByTestId("cancelButton");
   fireEvent.click(cancel);

   await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/");
   });
})

test("User signup submitted successfully", async () => {
   const name = 'Test Name';
   const username = 'testusername';
   const testPass = '1234';

   jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
         status: 201,
      })
   });
   jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
         status: 200,
         json: jest.fn().mockResolvedValue({name, username}),
      })
   })


   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <UserSignUp />
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>);

   const nameInput = screen.getByTestId("nameInput");
   const usernameInput = screen.getByTestId("usernameInput");
   const passwordInput = screen.getByTestId("passwordInput");
   nameInput.value = name;
   usernameInput.value = username;
   passwordInput.value = testPass;

   const signupButton = screen.getByTestId("signUpButton");
   fireEvent.click(signupButton);

   await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/authenticated");
   });
})

test.skip("User signup server error", async () => {
   jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 500
   })

   render(
      <BrowserRouter>
         <ThemeProvider>
            <UserProvider>
               <UserSignUp />
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>);

   const signupButton = screen.getByTestId("signUpButton");
   fireEvent.click(signupButton);

   await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/error");
   });
})