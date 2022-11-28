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
import AnswerQuestion from './AnswerQuestion';

it('renders username', async () => {
  render(<AnswerQuestion errorType="Not alphanumeric" />);
  await waitFor(() => {
    const error = screen.getByText('Answer your security question');
    expect(error).toBeInTheDocument();
  });
});
