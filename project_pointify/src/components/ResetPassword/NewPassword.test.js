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
import NewPassword from './NewPassword';

function signup() {
  return true;
}

it('renders username', async () => {
  render(<NewPassword signup={signup} errorType="Not alphanumeric" />);
  await waitFor(() => {
    const error = screen.getByText('Set a new password');
    expect(error).toBeInTheDocument();
  });
});
