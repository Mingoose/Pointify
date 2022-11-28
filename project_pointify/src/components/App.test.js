/**
* @jest-environment jsdom
*/
/* eslint-disable no-undef */
import bcrypt from 'bcryptjs';

import React from 'react';
import {
  waitFor, render, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import App from './App';

async function generate() {
  const salt = await bcrypt.genSalt(10);
  const hashedAnswer = await bcrypt.hash('Yes', salt);
  return hashedAnswer;
}

global.fetch = jest.fn(() => Promise.resolve({
  json: async () => Promise.resolve([{ username: 'Ethan', password: await generate() }]),
}));

it('renders username', async () => {
  const { getByText } = render(<App />);
  await waitFor(() => {
    const error = getByText('Username');
    expect(error).toBeInTheDocument();
  });
});

it('renders error correctly', async () => {
  const { getByText } = render(<App />);
  await waitFor(() => {
    fireEvent(
      document.getElementById('left'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const error = getByText('Your username should be alphanumeric');
    expect(error).toBeInTheDocument();
  });
});

it('successfull login', async () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  await waitFor(() => {
    fireEvent.change(getByPlaceholderText('Type your username'), {
      target: { value: 'Ethan' },
    });
    fireEvent.change(getByPlaceholderText('Type your password'), {
      target: { value: 'Yes' },
    });
    fireEvent(
      document.getElementById('left'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });
  const home = getByText('Home');
  expect(home).toBeInTheDocument();
});

it('successfull login', async () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  await waitFor(() => {
    fireEvent.change(getByPlaceholderText('Type your username'), {
      target: { value: 'Ethan' },
    });
    fireEvent.change(getByPlaceholderText('Type your password'), {
      target: { value: 'Yes' },
    });
    fireEvent(
      document.getElementById('left'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });
  const home = getByText('Home');
  expect(home).toBeInTheDocument();
});

it('existing user registration', async () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  await waitFor(() => {
    fireEvent(
      document.getElementById('right'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });
  await waitFor(() => {
    fireEvent.change(getByPlaceholderText('Type your username'), {
      target: { value: 'RegistrationTest' },
    });
    fireEvent.change(getByPlaceholderText('Type your password'), {
      target: { value: 'RegistrationTest' },
    });
    fireEvent.change(getByPlaceholderText('What was your first pets name?'), {
      target: { value: 'RegistrationTest' },
    });
    fireEvent.change(getByPlaceholderText('Enter the answer'), {
      target: { value: 'RegistrationTest' },
    });
  });
  await waitFor(() => {
    fireEvent(
      document.getElementById('reg'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });
  const login = getByText('This username already exists');
  expect(login).toBeInTheDocument();
});

it('detects not alphanumeric', async () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  await waitFor(() => {
    fireEvent(
      document.getElementById('right'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });
  await waitFor(() => {
    fireEvent.change(getByPlaceholderText('Type your username'), {
      target: { value: '%%%' },
    });
  });
  await waitFor(() => {
    fireEvent(
      document.getElementById('reg'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });
  const login = getByText('Your username should be alphanumeric');
  expect(login).toBeInTheDocument();
});

it('successfull login', async () => {
  const { getByText } = render(<App />);
  await waitFor(() => {
    fireEvent(
      document.getElementById('right'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });
  const home = getByText('Enter your details to create an account');
  expect(home).toBeInTheDocument();
});
