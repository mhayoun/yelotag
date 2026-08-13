import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the site title', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /yeloTag\.com/i, level: 1 });
  expect(titleElement).toBeInTheDocument();
});
