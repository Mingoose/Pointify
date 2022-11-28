import React from 'react';
import InputError from '../InputError';

function AnswerQuestion({ next, question, errorType }) {
  return (
    <div>
      <div className="bannerText">
        <p>Pointify</p>
      </div>
      <div className="login">
        <p id="loginText">Reset password</p>
        <p id="desc">Answer your security question</p>
        <InputError type={errorType} />
        <p id="topText">{question}</p>
        <input type="text" className="username" id="questionAnswer" placeholder="Type your answer" />
        <table className="buttonContainer" width="100%">
          <tr width="100%">
            <td width="45%"><button id="right" className="button" value="Next" type="button" onClick={next}>Next</button></td>
          </tr>
        </table>
        <table className="buttonContainer" width="100%">
          <tr width="100%">
            <td width="70%">&nbsp;</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default AnswerQuestion;
