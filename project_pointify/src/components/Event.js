/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */
import {
  React,
  useState,
  useRef,
} from 'react';
import '../assets/Event.css';
import settings from '../assets/settings.png';
import Main from './Main';
import Analytics from './Analytics';
import ChatPage from './Chat';

function Event(props) {
  console.log(props.message);
  const [chat, setChat] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [, homeStarted] = useState(false); // state for game start
  const home = useRef(false); // ref for game start

  function goHome() {
    homeStarted(true);
    home.current = true;
  }

  function handleChat() {
    setChat(true);
  }

  function handleAnalytics() {
    setAnalytics(true);
  }

  function logOut() {
    window.location.reload(false);
  }

  if (chat) {
    return (
      <ChatPage username={props.user} messageIconProp={props.messageIconProp} />
    );
  }

  if (analytics) {
    return (
      <Analytics username={props.user} messageIconProp={props.messageIconProp} />
    );
  }

  if (home.current) { // Login Page
    console.log(props.user);
    return (
      <div>
        <Main username={props.user} messageIconProp={props.messageIconProp} />
      </div>
    );
  }

  return (
    <div>
      <div className="banner">
        <a onClick={() => goHome()} className="text">Home</a>
        <img href="/" src={props.messageIconProp} id="icon" alt="messages icon" onClick={() => handleChat()} />
        <img href="/" src={settings} id="icon" alt="settings icon" onClick={() => handleAnalytics()} />
        <a onClick={() => logOut()} id="logout">Logout</a>
      </div>
      <div className="wrapper">
        <p className="eventTitle">
          {props.title}
        </p>
        <p className="whereabouts">
          Whereabouts: &nbsp;
          <p className="date">
            {' '}
            {props.date}
            {' '}
            &nbsp; | &nbsp;
            {' '}
          </p>
          <p className="times">
            {' '}
            {props.time}
            {' '}
            &nbsp; | &nbsp;
            {' '}
          </p>
          <p className="place">
            {' '}
            {props.location}
            {' '}
          </p>
        </p>
        <p className="eventDesc">
          {props.desc}
        </p>
      </div>
    </div>
  );
}

export default Event;
