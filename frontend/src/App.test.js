import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Udyam Registration Portal', () => {
  render(<App />);
  const titleElement = screen.getByText(/Udyam Registration/i);
  expect(titleElement).toBeInTheDocument();
});
