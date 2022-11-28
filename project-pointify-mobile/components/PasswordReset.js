/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import NewPassword from './ResetPassword/NewPassword';
import Username from './ResetPassword/EnterUsername';
import AnswerQuestion from './ResetPassword/AnswerQuestion';

function PasswordReset({ setForgotten, passwordSafety }) {
  const [username, setUsername] = useState('');
  const [passwordR, setPasswordR] = useState('');
  const [answer, setAnswer] = useState('');
  const [user, setUser] = useState('');
  const [question, setQuestion] = useState('');
  const [errorType, setErrorType] = useState('');
  const [questionPage, setQuestionPage] = useState(false);
  const [passwordPage, setPasswordPage] = useState(false);

  async function findUser() {
    const userName = username;
    if (!userName) {
      setErrorType('Username not found');
      return;
    }
    console.log(userName);
    const response = await fetch(`http://localhost:8888/users/${userName}`);
    const existingUser = await response.json();
    if (existingUser.length === 0) {
      setErrorType('Username not found');
      return;
    }
    setErrorType('');
    setUser(existingUser);
    setQuestion(existingUser[0].recoveryQuestion);
    setQuestionPage(true);
    setErrorType('');
  }

  async function isCorrectAnswer() {
    const userAnswer = answer;
    const encrypted = user[0].recoveryAnswer;
    const equal = await bcrypt.compare(userAnswer, encrypted);
    if (equal) {
      setErrorType('');
      setPasswordPage(true);
      return;
    }
    setErrorType('Incorrect Answer');
  }

  async function reset() {
    const password = passwordR;
    const safe = passwordSafety(password);
    if (safe) {
      const requestOptions = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: password, userName: user[0].username }),
      };
      await fetch('http://localhost:8888/reset', requestOptions);
      setForgotten(false);
      setErrorType('');
    }
  }

  const next = async () => {
    if (questionPage) {
      if (passwordPage) {
        reset();
        setForgotten(false);
      } else {
        isCorrectAnswer();
      }
    } else {
      findUser();
    }
  };
  if (passwordPage) {
    return (
      <NewPassword
        next={next}
        errorType={errorType}
        setPassword={setPasswordR}
        password={passwordR}
      />
    );
  }
  if (questionPage) {
    return (
      <AnswerQuestion
        next={next}
        errorType={errorType}
        question={question}
        setAnswer={setAnswer}
        answer={answer}
      />
    );
  }
  return (
    <Username next={next} errorType={errorType} setUserName={setUsername} userName={username} />
  );
}

export default PasswordReset;
