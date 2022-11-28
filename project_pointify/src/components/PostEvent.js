/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-cycle */
import {
  React,
  useState,
  useRef,
} from 'react';
import '../assets/PostEvent.css';
import Main from './Main';
import settings from '../assets/settings.png';
import ChatPage from './Chat';
import Analytics from './Analytics';

function PostEvent(props) {
  console.log(props.username);
  const [chat, setChat] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [, setStarted1] = useState(false); // state for game start
  const post = useRef(false); // ref for game start

  const [form, setForm] = useState({
    username: props.username,
    title: '',
    date: '',
    time: '',
    location: '',
    desc: '',
  });

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

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }
  function logOut() {
    window.location.reload(false);
  }

  const handlePost = async (e) => {
    e.preventDefault();
    const newEvent = { ...form };
    await fetch('https://project-pointify.herokuapp.com/record/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .catch((error) => {
        window.alert(error);
      });
    setForm({
      title: '', date: '', time: '', location: '', desc: '', username: props.username,
    });
    setStarted1(true);
    post.current = true;
  };

  if (post.current) { // Login Page
    return (
      <Main username={props.username} messageIconProp={props.messageIconProp} />
    );
  }

  if (home.current) { // Login Page
    return (
      <div>
        <Main username={props.username} messageIconProp={props.messageIconProp} />
      </div>
    );
  }

  if (chat) {
    return (
      <ChatPage username={props.username} messageIconProp={props.messageIconProp} />
    );
  }

  if (analytics) {
    return (
      <Analytics username={props.username} messageIconProp={props.messageIconProp} />
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
      <form className="registerEvent" onSubmit={handlePost}>
        <p className="textHeader">Post An Event</p>
        <div className="form">
          <p className="textboxText">Event Title</p>
          <input type="text" id="title" className="textbox" placeholder="FREE BOBA" name="title" onChange={(e) => updateForm({ title: e.target.value })} value={form.title} required />
          <div className="middleRowText">
            <p className="halfTextboxText">Date</p>
            <p className="halfTextboxText" id="timeText">Time</p>
          </div>
          <div className="middleRow">
            <input type="date" id="date" className="halfTextbox" name="date" value={form.date} onChange={(e) => updateForm({ date: e.target.value })} required />
            <input type="time" id="time" className="halfTextbox" name="time" value={form.time} onChange={(e) => updateForm({ time: e.target.value })} required />
          </div>
          <p className="textboxText">Location</p>
          <input type="text" id="location" className="textbox" placeholder="Harnwell College House" name="location" value={form.location} onChange={(e) => updateForm({ location: e.target.value })} required />
          <p className="textboxText">Description</p>
          <textarea text="text" id="description" className="largeTextbox" placeholder="Come make friends and drink some boba!" name="desc" value={form.desc} onChange={(e) => updateForm({ desc: e.target.value })} required />
        </div>
        <input className="postEventOnPage" value="Post Your Event" type="Submit" />
      </form>
    </div>
  );
}

export default PostEvent;
