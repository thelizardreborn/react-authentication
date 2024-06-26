import { render, waitFor } from '@testing-library/react';
import { UserProvider } from '../context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import UserSignOut from '../components/UserSignOut';
import { createMemoryHistory } from 'history';


test("User signout renders successfully", async () => {
   const history = createMemoryHistory();
   render(
      <BrowserRouter>
         <UserProvider>
            <UserSignOut />
         </UserProvider>
      </BrowserRouter>);

   await waitFor(() => {
      expect(history.location.pathname).toBe("/");
   });
});
