/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

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
    <View>
      {incorrect && <Text style={styles.error}>Incorrect answer</Text>}
      {blocked && <Text style={styles.error}>Too many attempts, account blocked for 24 hours</Text>}
      {alphanumeric && <Text style={styles.error}>Your username should be alphanumeric</Text>}
      {existingUsername && <Text style={styles.error}>This username already exists</Text>}
      {weakPassword && (
      <Text style={styles.error}>
        Your password should be at least 8 characters long
      </Text>
      )}
      {usernameNotFound && <Text style={styles.error}>Username not found. Please register</Text>}
      {invalidPassword && <Text style={styles.error}>Invalid password please try again</Text>}
      {spacesInPassword && (<Text style={styles.error}>Password can&apos;t contain spaces</Text>)}
    </View>
  );
}

export default InputError;
