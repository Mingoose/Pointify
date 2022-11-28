/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../assets/Banner.css';
import { React, useState, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import messages from '../assets/messages.png';
import settings from '../assets/settings.png';
import Main from './Main';

function Banner({ username }) {
  const [, homeStarted] = useState(false); // state for game start
  const home = useRef(false); // ref for game start

  function goHome() {
    homeStarted(true);
    home.current = true;
    ReactDOM.unmountComponentAtNode(document.getElementById('main'));
  }

  function logOut() {
    window.location.reload(false);
  }
  if (home.current) {
    return (
      <div>
        <Banner username={username} />
        <Main username={username} />
      </div>
    );
  }

  return (
    <div className="banner">
      <a onClick={() => goHome()} className="text">Home</a>
      <a onClick={() => logOut()} className="text">Logout</a>
      <img href="/" src={messages} id="icon" alt="messages icon" />
      <img href="/" src={settings} id="icon" alt="settings icon" />
    </div>
  );
}

export default Banner;
