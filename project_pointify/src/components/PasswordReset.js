import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import NewPassword from './ResetPassword/NewPassword';
import Username from './ResetPassword/EnterUsername';
import AnswerQuestion from './ResetPassword/AnswerQuestion';

function PasswordReset({ setForgotten, passwordSafety }) {
  const [user, setUser] = useState('');
  const [question, setQuestion] = useState('');
  const [errorType, setErrorType] = useState('');
  const [questionPage, setQuestionPage] = useState(false);
  const [passwordPage, setPasswordPage] = useState(false);

  async function findUser() {
    const userName = document.getElementById('userReset').value;
    if (!userName) {
      setErrorType('Username not found');
      return;
    }
    console.log(userName);
    const response = await fetch(`https://project-pointify.herokuapp.com/users/${userName}`);
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
    const userAnswer = document.getElementById('questionAnswer').value;
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
    const password = document.getElementById('reset').value;
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
      await fetch('https://project-pointify.herokuapp.com/reset', requestOptions);
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
      <NewPassword next={next} errorType={errorType} />
    );
  }
  if (questionPage) {
    return (
      <AnswerQuestion next={next} errorType={errorType} question={question} />
    );
  }
  return (
    <Username next={next} errorType={errorType} />
  );
}

export default PasswordReset;
