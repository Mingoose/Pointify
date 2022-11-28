/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
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
});

function Register({
  signup, errorType, username, password, setUsername,
  setPassword, setQuestion, setAnswer, question, answer,
}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Pointify</Text>
      </View>
      <View>
        <Text style={styles.title}>Register</Text>
        <Text>Enter your details to create an account</Text>
        <InputError type={errorType} />
        <Text>Username</Text>
        <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder="Type your username" />
        <Text>Password</Text>
        <TextInput secureTextEntry onChangeText={setPassword} value={password} style={styles.input} placeholder="Type your password" />
        <Text>Enter a question for password recovery</Text>
        <TextInput style={styles.input} onChangeText={setQuestion} value={question} placeholder="What was your first pets name?" />
        <Text>Answer to the question</Text>
        <TextInput style={styles.input} onChangeText={setAnswer} value={answer} placeholder="Enter the answer" />
        <View>
          <BasicButton onPress={signup} text="Register" color="#efefef" textColor="black" width={300} />
        </View>
      </View>
    </View>
  );
}

export default Register;
