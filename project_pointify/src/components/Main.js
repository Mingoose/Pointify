/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
import {
  React, useState, useRef, useEffect,
} from 'react';
import { StreamChat } from 'stream-chat';
import '../assets/Main.css';
import PostEvent from './PostEvent';
import Event from './Event';
import ChatPage from './Chat';
import Analytics from './Analytics';
import messages from '../assets/messages.png';
import messagesNotification from '../assets/messages_notification.png';
import settings from '../assets/settings.png';
import '../assets/Banner.css';

function Main({ username, messageIconProp }) {
  const [, setStarted1] = useState(false);
  const [, eventOpened] = useState(false);
  const [chat, setChat] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const post = useRef(false);
  const opened = useRef(false);
  const eventOpenedIndex = useRef(0);
  const [records, setRecords] = useState([]);
  const [, homeStarted] = useState(false); // state for game start
  const home = useRef(false); // ref for game start
  const [messageNotification, setMessageNotification] = useState(false);
  // following variables are for initializing the user in chat
  const apiKey = '3wzm36fgv4zb';
  const client = StreamChat.getInstance(apiKey);
  const id = String(username);
  const messageIcon = useRef(messageIconProp);
  let info = {};
  function goHome() {
    homeStarted(true);
    home.current = true;
  }
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch('https://project-pointify.herokuapp.com/record/');

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      // eslint-disable-next-line no-shadow
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    setInterval(getRecords, 5000);

    // initialize user in chat
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id,
            name: id,
          },
          client.devToken(id),
        );
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();

    const setUpNotifications = async () => {
      client.on((event) => {
        if (parseInt(event.total_unread_count, 10) >= 1) {
          console.log('message new');
          messageIcon.current = messagesNotification;
          setMessageNotification(!messageNotification);
        } else if (parseInt(event.total_unread_count, 10) === 0) {
          messageIcon.current = messages;
          console.log('message read');
          setMessageNotification(!messageNotification);
        }
      });
    };
    setUpNotifications();

    client.on((event) => {
      if (event.total_unread_count !== undefined) {
        console.log(event.total_unread_count);
      }
      if (event.unread_channels !== undefined) {
        console.log(event.unread_channels);
      }
    });
  }, [records.length]);

  function handlePost() {
    setStarted1(true);
    post.current = true;
  }

  function handleChat() {
    setChat(true);
  }

  function handleAnalytics() {
    setAnalytics(true);
  }

  if (post.current) {
    info = {
      username,
      messageIconProp: messageIcon.current,
    };

    return (
      <PostEvent {...info} />
    );
  }

  function openEvent(index) {
    eventOpened(true);
    eventOpenedIndex.current = index;
    opened.current = true;
  }
  function logOut() {
    window.location.reload(false);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record, index) => (
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
      title: records.at(eventOpenedIndex.current).title,
      date: records.at(eventOpenedIndex.current).date,
      time: records.at(eventOpenedIndex.current).time,
      location: records.at(eventOpenedIndex.current).location,
      desc: records.at(eventOpenedIndex.current).desc,
      messageIconProp: messageIcon.current,
    };
    return (
      <Event {...info} />
    );
  }

  if (chat) {
    return (
      <ChatPage username={username} messageIconProp={messageIcon.current} />
    );
  }

  if (analytics) {
    return (
      <Analytics username={username} messageIconProp={messageIcon.current} />
    );
  }

  if (home.current) { // Login Page
    return (
      <div>
        <Main username={username} messageIconProp={messageIcon.current} />
      </div>
    );
  }

  return ( // main page started
    <div>
      <div className="banner">
        <a onClick={() => goHome()} className="text">Home</a>
        <img href="/" src={messageIcon.current} id="icon" alt="messages icon" onClick={() => handleChat()} />
        <img href="/" src={settings} id="icon" alt="settings icon" onClick={() => handleAnalytics()} />
        <a onClick={() => logOut()} id="logout">Logout</a>
      </div>
      <div className="main" id="main">
        <div className="brandName">Pointify</div>
        <p>Events near you:</p>
        <div className="eventScroll">
          {recordList()}
        </div>
        <button className="postEvent" type="button" onClick={() => handlePost()}>
          Post Your Event
        </button>
      </div>
    </div>
  );
}

export default Main;
