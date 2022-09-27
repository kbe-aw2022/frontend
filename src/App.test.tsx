import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders company name', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const companyName = screen.getByText(/Computer-Store/i);
  expect(companyName).toBeInTheDocument();
});
