import { render, screen } from '@testing-library/react';
import Authenticated from '../components/Authenticated';
import { UserProvider } from '../context/UserContext';
import Cookie from 'js-cookie';

test("Authenticated renders successfully", () => {
   const name = 'Test Name';
   const username = 'testusername';
   const authUser = {
      name,
      username
   }

   Cookie.get = jest.fn().mockImplementation(() => JSON.stringify(authUser));

   render(
      <UserProvider>
         <Authenticated />
      </UserProvider>);

   const nameElement = screen.getByText(`${name} is Authenticated`);
   const usernameElement = screen.getByText(`Your username is ${username}`);

   expect(nameElement).toBeInTheDocument();
   expect(usernameElement).toBeInTheDocument();
})