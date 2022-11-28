import bcrypt from 'bcryptjs';
import { React, useState, useRef } from 'react';
import Main from './Main';
import '../assets/App.css';
import Login from './Login';
import Register from './Register';
import registration from '../modules/signup';
import messages from '../assets/messages.png';
import PasswordReset from './PasswordReset';

function App() {
  const [start, setStarted] = useState(false); // state for game start
  const [errorType, setErrorType] = useState('');
  const [register, setRegister] = useState(false);
  const [forgotten, setForgotten] = useState(false);
  const username = useRef('');
  const attempts = useRef(0);
  function handleStart() {
    setStarted(true);
  }

  function passwordSafety(password) {
    const isLong = /^.{8,35}$/;
    const noSpaces = /^\S/;
    if (!password.match(noSpaces)) {
      return 'spaces';
    }
    if (password.match(isLong)) {
      return 'safe';
    }
    return 'Weak password';
  }

  const login = async () => {
    let equal = false;
    const loginUsername = document.getElementById('LoginUsername').value;
    const loginPassword = document.getElementById('LoginPassword').value;
    username.current = loginUsername;
    const regEx = /^[0-9a-zA-Z]+$/;
    if (loginUsername.match(regEx)) { // check if alphanumeric
      const response = await fetch(`https://project-pointify.herokuapp.com/users/${loginUsername}`);
      const existingUser = await response.json();
      if (existingUser.length === 0) { // if the username doesn't exist
        setErrorType('Username not found');
        console.log(existingUser);
        return;
      } if ((existingUser[0].blocked !== 'No') && ((Date.now() - Date.parse(existingUser[0].blocked) < 86400000))) {
        setErrorType('blocked');
        return;
      }
      const encrypted = existingUser[0].password;
      equal = await bcrypt.compare(loginPassword, encrypted);
      console.log(equal);

      if (equal) {
        handleStart();
        console.log('started');
      } else {
        attempts.current += 1;
        if (attempts.current >= 3) {
          const requestOptions = {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: loginUsername, action: 'block' }),
          };
          await fetch('https://project-pointify.herokuapp.com/block', requestOptions);
        }
        setErrorType('Invalid password');
      }
    } else { // if the input is not alphanumeric
      setErrorType('Not alphanumeric');
    }
  };

  const signup = async () => {
    setErrorType('');
    registration(setRegister, setErrorType, passwordSafety);
  };
  const reset = () => {
    setErrorType('');
    setForgotten(true);
  };

  if (register) { // Registration Page
    return (
      <Register errorType={errorType} signup={signup} />
    );
  }
  if (forgotten) {
    return (
      <PasswordReset
        setForgotten={setForgotten}
        passwordSafety={(password) => passwordSafety(password)}
      />
    );
  }
  if (!start) { // Login Page
    return (
      <Login
        errorType={errorType}
        signup={signup}
        login={login}
        reset={reset}
      />
    );
  }
  return ( // Main Page
    <Main username={username.current} messageIconProp={messages} />
  );
}

export default App;
