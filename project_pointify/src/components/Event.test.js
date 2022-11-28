/**
* @jest-environment jsdom
*/
/* eslint-disable no-undef */

import React from 'react';
import {
  waitFor, render, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import Event from './Event';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([{ user: 'Ethan' }]),
}));

it('renders event2', async () => {
  render(<Event user="Ethan" />);
  fireEvent(
    screen.getByAltText('messages icon'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
  await waitFor(() => {
    const linkElement = screen.getByText(/members/i);
    expect(linkElement).toBeInTheDocument();
  });
});

it('renders chat 3', async () => {
  render(<Event user="Ethan" />);
  await waitFor(() => {
    fireEvent(
      screen.getByAltText('settings icon'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const linkElement = screen.getByText(/Ethan/i);
    expect(linkElement).toBeInTheDocument();
  });
});

it('renders event4', async () => {
  render(<Event user="Ethan" />);
  fireEvent(
    screen.getByText('Home'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
  await waitFor(() => {
    const linkElement = screen.getByText(/Pointify/i);
    expect(linkElement).toBeInTheDocument();
  });
});
