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
import Analytics from './Analytics';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([{ joinDate: 'Mon May 02 2022' }]),
}));

it('renders analytics', async () => {
  render(<Analytics username="Ethan" />);
  await waitFor(() => {
    const linkElement = screen.getByText(/Mon May 02 2022/i);
    expect(linkElement).toBeInTheDocument();
  });
});

it('renders analytics2', async () => {
  render(<Analytics username="Ethan" />);
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

it('renders analytics3', async () => {
  render(<Analytics username="Ethan" />);
  fireEvent(
    screen.getByAltText('settings icon'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
  await waitFor(() => {
    const linkElement = screen.getByText(/Mon May 02 2022/i);
    expect(linkElement).toBeInTheDocument();
  });
});

it('renders analytics4', async () => {
  render(<Analytics username="Ethan" />);
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
