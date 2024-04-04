import { render, screen } from '@testing-library/react'
import Home from '../components/Home'

test("Home renders successfully", () => {
   render(<Home />);

   const element = screen.getByText('Welcome to the Main Page');

   expect(element).toBeInTheDocument();
});