/**
* @jest-environment jsdom
*/
/* eslint-disable no-undef */
import bcrypt from 'bcryptjs';

import React from 'react';
import {
  waitFor, render, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import PasswordReset from './PasswordReset';

async function generate() {
  const salt = await bcrypt.genSalt(10);
  const hashedAnswer = await bcrypt.hash('Yes', salt);
  return hashedAnswer;
}

function passwordSafety() {
  return true;
}

function setForgotten(arg) {
  return arg;
}

global.fetch = jest.fn(() => Promise.resolve({
  json: async () => Promise.resolve([{ username: 'Ethan', recoveryAnswer: await generate() }]),
}));

it('renders username', async () => {
  render(<PasswordReset errorType="Not alphanumeric" />);
  await waitFor(() => {
    const error = screen.getByText('To reset your password, first enter your username');
    expect(error).toBeInTheDocument();
  });
});

it('Checks existing user', async () => {
  const { getByPlaceholderText, getByText } = render(<PasswordReset errorType="Not alphanumeric" />);
  await waitFor(() => {
    fireEvent.change(getByPlaceholderText('Type your username'), {
      target: { value: '' },
    });
  });
  await waitFor(() => {
    fireEvent(
      screen.getByText(/Next/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const error = getByText('Username not found. Please register');
    expect(error).toBeInTheDocument();
  });
});

it('Moves to next page for correct answer', async () => {
  const { getByPlaceholderText, getByText } = render(<PasswordReset errorType="Not alphanumeric" />);
  await waitFor(() => {
    fireEvent.change(getByPlaceholderText('Type your username'), {
      target: { value: 'Ethan' },
    });
  });
  await waitFor(() => {
    fireEvent(
      screen.getByText(/Next/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const error = getByText('Answer your security question');
    expect(error).toBeInTheDocument();
  });
});

it('Moves to last page', async () => {
  const { getByPlaceholderText, getByText } = render(<PasswordReset setForgotten={setForgotten} passwordSafety={passwordSafety} errorType="Not alphanumeric" />);
  await waitFor(() => {
    fireEvent.change(getByPlaceholderText('Type your username'), {
      target: { value: 'Ethan' },
    });
  });
  await waitFor(() => {
    fireEvent(
      screen.getByText(/Next/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });
  await waitFor(() => {
    fireEvent.change(getByPlaceholderText('Type your answer'), {
      target: { value: 'Yes' },
    });
  });
  await waitFor(() => {
    fireEvent(
      screen.getByText(/Next/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const error = getByText('Set a new password');
    expect(error).toBeInTheDocument();
  });
});
