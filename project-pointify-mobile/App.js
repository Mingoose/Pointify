/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
import { React, useState, useRef } from 'react';
import bcrypt from 'bcryptjs';
import PasswordReset from './components/PasswordReset';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [, setStarted] = useState(false);// state for game start
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [forgotten, setForgotten] = useState(false);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [RuserName, setRUsername] = useState('');
  const [Rpassword, setRPassword] = useState('');
  const [errorType, setErrorType] = useState('');
  const [register, setRegister] = useState(false);
  const start = useRef(false);// ref for game start
  const attempts = useRef(0);
  function handleStart() {
    start.current = true;
    setStarted(true);
  }

  function passwordSafety(pw) {
    const isLong = /^.{8,35}$/;
    const noSpaces = /^\S/;
    if (!pw.match(noSpaces)) {
      return 'spaces';
    }
    if (pw.match(isLong)) {
      return 'safe';
    }
    return 'Weak password';
  }

  async function login() {
    let equal = false;
    const loginUsername = userName;
    const loginPassword = password;
    const regEx = /^[0-9a-zA-Z]+$/;
    if (loginUsername.match(regEx)) { // check if alphanumeric
      const response = await fetch(`http://localhost:8888/users/${loginUsername}`);
      const existingUser = await response.json();
      if (existingUser.length === 0) { // if the username is not in local storage
        setErrorType('Username not found');
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
          await fetch('http://localhost:8888/block', requestOptions);
        }
        setErrorType('Invalid password');
      }
    } else { // if the input is not alphanumeric
      setErrorType('Not alphanumeric');
    }
  }

  const reset = () => {
    setErrorType('');
    setPassword('');
    setUsername('');
    setForgotten(true);
  };
  async function signupB() {
    setRegister(true);
  }

  async function signup() {
    setRegister(true);
    setErrorType('');
    const signupUsername = RuserName;
    const signupPassword = Rpassword;
    const recoveryQuestion = question;
    const recoveryAnswer = answer;
    const regEx = /^[0-9a-zA-Z]+$/;
    const safety = passwordSafety(signupPassword);
    if (signupUsername.match(regEx)) { // check if alphanumeric
      const response = await fetch(`http://localhost:8888/users/${signupUsername}`);
      const existingUser = await response.json();
      if (existingUser.length === 0) { // if the username doesn't exist
        if (safety === 'safe') {
          const rawResponse = await fetch('http://localhost:8888/register', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: signupUsername,
              password: signupPassword,
              recoveryq: recoveryQuestion,
              recoverya: recoveryAnswer,
              joinDate: (new Date(Date.now())).toDateString(),
            }),
          });
          const content = await rawResponse.json();
          console.log(content);
          setRegister(false);
        } else {
          setErrorType(safety);
        }
      } else {
        setErrorType('Existing username');
      }
    } else { // if the input is not alphanumeric
      setErrorType('Not alphanumeric');
    }
  }
  if (forgotten) {
    return (
      <PasswordReset
        setForgotten={setForgotten}
        passwordSafety={(a) => passwordSafety(a)}
      />
    );
  }

  if (register) { // Registration Page
    return (
      <Register
        errorType={errorType}
        signup={signup}
        userName={RuserName}
        password={Rpassword}
        setUsername={setRUsername}
        setPassword={setRPassword}
        answer={answer}
        setAnswer={setAnswer}
        question={question}
        setQuestion={setQuestion}

      />
    );
  }
  if (!start.current) { // Login Page
    return (
      <Login
        reset={reset}
        errorType={errorType}
        signup={signupB}
        login={login}
        userName={userName}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    );
  }
  return ( // Main Page
    <Main username={userName} />
  );
}

export default App;
