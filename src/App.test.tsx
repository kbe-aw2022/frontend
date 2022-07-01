import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders company name', () => {
  render(<App />);
  const companyName = screen.getByText(/Computer-Store/i);
  expect(companyName).toBeInTheDocument();
});
