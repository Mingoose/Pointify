import React from 'react';
import InputError from './InputError';

function Register({ signup, errorType }) {
  return (
    <div>
      <div className="bannerText">
        <p>Pointify</p>
      </div>
      <div className="login">
        <p id="loginText">Register</p>
        <p id="desc">Enter your details to create an account</p>
        <InputError type={errorType} />
        <p id="topText">Username</p>
        <input type="text" className="password" id="RegisrerUsername" placeholder="Type your username" />
        <p id="topText">Password</p>
        <input type="password" className="username" id="RegisterPassword" placeholder="Type your password" />
        <p id="topText">Enter a question for password recovery</p>
        <input type="text" className="username" id="recoveryQuestion" placeholder="What was your first pets name?" />
        <p id="topText">Answer to the question</p>
        <input type="text" className="username" id="recoveryAnswer" placeholder="Enter the answer" />
        <table className="buttonContainer" width="100%">
          <tr width="100%">
            <td width="45%"><button id="reg" className="button" type="button" onClick={signup}>Register</button></td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Register;
