/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

function InputError({ type }) {
  const alphanumeric = type === 'Not alphanumeric';
  const weakPassword = type === 'Weak password';
  const existingUsername = type === 'Existing username';
  const usernameNotFound = type === 'Username not found';
  const invalidPassword = type === 'Invalid password';
  const spacesInPassword = type === 'spaces';
  const blocked = type === 'blocked';
  const incorrect = type === 'Incorrect Answer';

  return (
    <div className="error">
      {incorrect && <p>The answer provided is incorrect</p>}
      {blocked && <p>Too many attempts. Your account was blocked for 24 hours.</p>}
      {alphanumeric && <p>Your username should be alphanumeric</p>}
      {existingUsername && <p>This username already exists</p>}
      {weakPassword && <p>Your password should be at least 8 characters long</p>}
      {usernameNotFound && <p>Username not found. Please register</p>}
      {invalidPassword && <p>Invalid password please try again</p>}
      {spacesInPassword && (<p>Password can&apos;t contain spaces</p>)}
    </div>
  );
}
InputError.propTypes = {
  type: PropTypes.string.isRequired,
};

export default InputError;
