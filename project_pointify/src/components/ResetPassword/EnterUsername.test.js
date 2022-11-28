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
import Username from './EnterUsername';

it('renders username', async () => {
  render(<Username errorType="Not alphanumeric" />);
  await waitFor(() => {
    const error = screen.getByText('To reset your password, first enter your username');
    expect(error).toBeInTheDocument();
  });
});
