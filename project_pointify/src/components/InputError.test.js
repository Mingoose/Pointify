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
import InputError from './InputError';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([{ user: 'Ethan' }]),
}));

it('renders error1', async () => {
  render(<InputError type="Not alphanumeric" />);
  await waitFor(() => {
    const error = screen.getByText('Your username should be alphanumeric');
    expect(error).toBeInTheDocument();
  });
});

it('renders error2', async () => {
  render(<InputError type="spaces" />);
  await waitFor(() => {
    const error = screen.getByText("Password can't contain spaces");
    expect(error).toBeInTheDocument();
  });
});

it('renders error3', async () => {
  render(<InputError type="Incorrect Answer" />);
  await waitFor(() => {
    const error = screen.getByText('The answer provided is incorrect');
    expect(error).toBeInTheDocument();
  });
});

it('renders error4', async () => {
  render(<InputError type="Username not found" />);
  await waitFor(() => {
    const error = screen.getByText('Username not found. Please register');
    expect(error).toBeInTheDocument();
  });
});

it('renders error5', async () => {
  render(<InputError type="Invalid password" />);
  await waitFor(() => {
    const error = screen.getByText('Invalid password please try again');
    expect(error).toBeInTheDocument();
  });
});
