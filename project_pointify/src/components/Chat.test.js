/**
* @jest-environment jsdom
*/
/* eslint-disable no-undef */

import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import ChatPage from './Chat';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([{ username: 'Ethan' }]),
}));

it('renders chat', async () => {
  render(<ChatPage username="Ethan" />);
  await waitFor(() => {
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  });
});

it('renders chat 2', async () => {
  render(<ChatPage username="Ethan" />);
  await waitFor(() => {
    fireEvent(
      screen.getByText(/Home/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  });
});

it('renders chat 3', async () => {
  render(<ChatPage username="Ethan" />);
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
