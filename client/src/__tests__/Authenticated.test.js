import { render, screen } from '@testing-library/react'
import Authenticated from '../components/Authenticated';
import UserContext from '../context/UserContext';

test("Authenticated renders successfully", () => {
   const name = 'Test Name';
   const username = 'testusername';
   const signIn = jest.fn();
   const signOut = jest.fn();
   const authUser = {
      name,
      username
   };

   render(
      <UserContext.Provider value={{
         authUser,
         actions: {
            signIn,
            signOut,
         }
      }}>
         <Authenticated />
      </UserContext.Provider>);

   const nameElement = screen.getByText(`${name} is Authenticated`);
   const usernameElement = screen.getByText(`Your username is ${username}`);

   expect(nameElement).toBeInTheDocument();
   expect(usernameElement).toBeInTheDocument();
})