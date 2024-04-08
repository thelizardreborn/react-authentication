import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test("Authenticated renders successfully", () => {
   render(
      <NotFound />
   );

   const headerElement = screen.getByText('Not Found');

   expect(headerElement).toBeInTheDocument();
})