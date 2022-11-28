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
import Register from './Register';

function signup() {
  return true;
}

it('renders username', async () => {
  render(<Register signup={signup} errorType="Not alphanumeric" />);
  await waitFor(() => {
    const error = screen.getByText('Username');
    expect(error).toBeInTheDocument();
  });
});
