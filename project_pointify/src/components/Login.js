import React from 'react';
import InputError from './InputError';

function Login({
  login, signup, reset, errorType,
}) {
  return (
    <div>
      <div className="bannerText">
        <p>Pointify</p>
      </div>
      <div className="login">
        <p id="loginText">Login</p>
        <p id="desc">Welcome back! Please login to your account.</p>
        <InputError type={errorType} />
        <p id="topText">Username</p>
        <input type="text" className="username" id="LoginUsername" placeholder="Type your username" />
        <p id="topText">Password</p>
        <input type="password" className="password" id="LoginPassword" placeholder="Type your password" />
        <table className="buttonContainer" width="100%">
          <tr width="100%">
            <td width="45%"><button id="right" className="button" value="signup" type="button" onClick={signup}>Sign Up</button></td>
            <td width="5%">&nbsp;</td>
            <td width="45%"><button id="left" className="button" value="login" type="button" onClick={login}>Login</button></td>
          </tr>
        </table>
        <table className="buttonContainer" width="100%">
          <tr width="100%">
            <td width="70%">&nbsp;</td>
            <td width="30%"><p id="forgottenPassword" onClick={reset}>Forgot password?</p></td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Login;
