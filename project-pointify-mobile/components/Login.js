/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';
import InputError from './InputError';
import BasicButton from './BasicButton';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },

  input: {
    borderRadius: 50,
    padding: 15,
    margin: 20,
    width: 300,
    borderColor: 'black',
    borderWidth: 1,
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
  },

  error: {
    color: 'red',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});

export default function Login({
  reset, login, signup, errorType, username, password, setUsername, setPassword,
}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Pointify</Text>
      </View>
      <View>
        <Text style={styles.title}>Login</Text>
        <Text>Enter your username and password</Text>
        <InputError type={errorType} />
        <Text>Username</Text>
        <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder="Type your username" />
        <Text>Password</Text>
        <TextInput secureTextEntry onChangeText={setPassword} value={password} style={styles.input} placeholder="Type your password" />
        <View style={styles.buttons}>
          <BasicButton onPress={signup} text="Register" color="#efefef" textColor="black" width={130} />
          <BasicButton onPress={login} text="Login" color="#efefef" textColor="black" width={130} />
        </View>
        <Text onPress={reset}>Forgot password?</Text>
      </View>
    </View>
  );
}
