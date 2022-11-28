/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';
import BasicButton from '../BasicButton';
import InputError from '../InputError';

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

function Username({
  next, errorType, setPassword, password,
}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Pointify</Text>
      </View>
      <View>
        <Text style={styles.title}>Reset password</Text>
        <Text>Enter your new password</Text>
        <InputError type={errorType} />
        <Text>Password</Text>
        <TextInput secureTextEntry onChangeText={setPassword} value={password} style={styles.input} placeholder="Type your password" />
        <View>
          <BasicButton onPress={next} text="Next" color="#efefef" textColor="black" width={300} />
        </View>
      </View>
    </View>
  );
}

export default Username;
