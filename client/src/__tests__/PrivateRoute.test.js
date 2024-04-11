import { render, screen } from '@testing-library/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Cookie from 'js-cookie';
import { UserProvider } from '../context/UserContext';
import PrivateRoute from '../components/PrivateRoute';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedNavigate,
}));

afterEach(() => {
   jest.restoreAllMocks();
});

test("PrivateRoute auth render", () => {
   const history = createMemoryHistory({ initialEntries: ["/Private"] });
   const PrivateComponent = () => <>Private Rendered</>
   const PublicComponent = () => <>Public Rendered</>
   const name = 'Test Name';
   const username = 'testusername';
   const authUser = {
      name,
      username
   }

   Cookie.get = jest.fn().mockImplementation(() => JSON.stringify(authUser));

   render(
      <BrowserRouter history={history}>
         <UserProvider>
            <Routes>
               <Route element={<PrivateRoute />}>
                  <Route path="/" element={<PrivateComponent />} />
               </Route>
               <Route path="signin" element={<PublicComponent />} />
            </Routes>
         </UserProvider>
      </BrowserRouter>
   );

   const routeElement = screen.getByText('Private Rendered');

   expect(routeElement).toBeInTheDocument();
})

test("PrivateRoute anon redirect", async () => {
   const history = createMemoryHistory({ initialEntries: ["/Private"] });
   const PrivateComponent = () => <>Private Rendered</>
   const PublicComponent = () => <>Public Rendered</>

   render(
      <BrowserRouter history={history}>
         <UserProvider>
            <Routes>
               <Route element={<PrivateRoute />}>
                  <Route path="/" element={<PrivateComponent />} />
               </Route>
               <Route path="signin" element={<PublicComponent />} />
            </Routes>
         </UserProvider>
      </BrowserRouter>
   );

   const routeElement = screen.getByText('Public Rendered');

   expect(routeElement).toBeInTheDocument();
})