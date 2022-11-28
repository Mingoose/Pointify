/**
* @jest-environment jsdom
*/
/* eslint-disable no-undef */

import React from 'react';
import {
  waitFor, render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import Login from './Login';

it('renders username', async () => {
  render(<Login errorType="Not alphanumeric" />);
  await waitFor(() => {
    const error = screen.getByText('Username');
    expect(error).toBeInTheDocument();
  });
});

it('renders password', async () => {
  render(<Login errorType="Not alphanumeric" />);
  await waitFor(() => {
    const error = screen.getByText('Password');
    expect(error).toBeInTheDocument();
  });
});
