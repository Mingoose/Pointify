/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-alert */
import {
  React, useState, useRef, useEffect,
} from 'react';
import '../assets/Main.css';
import '../assets/Analytics.css';
import Event from './Event';
import messages from '../assets/messages.png';
import settings from '../assets/settings.png';
import Main from './Main';
import ChatPage from './Chat';

function Analytics({ username, messageIconProp }) {
  const [chat, setChat] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  console.log(username);
  const date = useRef('');
  const [, eventOpened] = useState(false);
  const opened = useRef(false);
  const eventOpenedIndex = useRef(0);
  const UserRecords = useRef([]);
  const [updateView, setUpdateView] = useState(false);
  let info = {};
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

  useEffect(() => {
    async function getUserRecords() {
      const response = await fetch('https://project-pointify.herokuapp.com/record/');
      const awaitedUserRecords = await response.json();
      UserRecords.current = awaitedUserRecords;
      console.log(awaitedUserRecords);
    }
    getUserRecords();

    async function getUser() {
      const response = await fetch(`https://project-pointify.herokuapp.com/users/${username}`);
      const existingUser = await response.json();
      if (date.current !== existingUser[0].joinDate) {
        date.current = existingUser[0].joinDate;
        setUpdateView(!updateView);
      }
      console.log(date.current);
    }
    getUser();
  }, [UserRecords.length]);

  function openEvent(index) {
    eventOpened(true);
    eventOpenedIndex.current = index;
    opened.current = true;
  }

  function recordList() {
    const tempUserRecords = [];
    for (let i = 0; i < UserRecords.current.length; i += 1) {
      try {
        if (UserRecords.current[i].username === username) {
          tempUserRecords.push(UserRecords.current[i]);
          console.log('match found');
        }
      } catch (err) {
        console.log(err);
      }
    }
    UserRecords.current = tempUserRecords;
    console.log(UserRecords.current);
    return UserRecords.current.map((record, index) => (
      <div id="e1" className="event">
        <p className="desc">{record.title}</p>
        <p className="time">
          Date:
          {' '}
          {record.date}
        </p>
        <p onClick={() => openEvent(index)} className="link">show me</p>
      </div>
    ));
  }
  if (opened.current) {
    info = {
      user: username,
      title: UserRecords.current.at(eventOpenedIndex.current).title,
      date: UserRecords.current.at(eventOpenedIndex.current).date,
      time: UserRecords.current.at(eventOpenedIndex.current).time,
      location: UserRecords.current.at(eventOpenedIndex.current).location,
      desc: UserRecords.current.at(eventOpenedIndex.current).desc,
      messageIconProp,
    };
    return (
      <Event {...info} />
    );
  }
  if (chat) {
    return (
      <ChatPage username={username} messageIconProp={messageIconProp} />
    );
  }

  if (analytics) {
    return (
      <Analytics username={username} messageIconProp={messageIconProp} />
    );
  }

  if (home.current) { // Login Page
    return (
      <div>
        <Main username={username} messageIconProp={messageIconProp} />
      </div>
    );
  }
  return (
    <div>
      <div className="banner">
        <a onClick={() => goHome()} className="text">Home</a>
        <img href="/" src={messages} id="icon" alt="messages icon" onClick={() => handleChat()} />
        <img href="/" src={settings} id="icon" alt="settings icon" onClick={() => handleAnalytics()} />
      </div>
      <div className="main" id="main">
        <div className="pageTitle">User Dashboard</div>
        <div className="subheaderAnalytics">
          User &nbsp;
          <b>
            {username}
          </b>
          &nbsp; joined on &nbsp;
          <b>
            {date.current}
          </b>
        </div>
        <p className="eventsPosted">
          <b>
            {UserRecords.current.length}
          </b>
          {' '}
          Events Posted:
        </p>
        <div className="eventScroll">
          {recordList()}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
