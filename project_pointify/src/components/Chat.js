/* eslint-disable no-alert */
/* eslint-disable array-callback-return */
import '../assets/Chat.css';
import React, { useEffect, useState, useRef } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';
import settings from '../assets/settings.png';
import Main from './Main';
import Analytics from './Analytics';

function ChatPage({ username, messageIconProp }) {
  const [chat, setChat] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const id = String(username);
  const filters = { type: 'messaging', members: { $in: [id] } };
  const options = { state: true, presence: true, limit: 10 };
  const sort = { last_message_at: -1 };
  const [clientReady, setClientReady] = useState(false);
  const apiKey = '3wzm36fgv4zb';
  const users = useRef([]);
  const client = StreamChat.getInstance(apiKey);
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

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id,
            name: id,
          },
          client.devToken(id),
        );

        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();
  }, []);

  async function getUsers() {
    const response = await fetch('https://project-pointify.herokuapp.com/users/');
    const awaitedUsers = await response.json();
    users.current = awaitedUsers;
    console.log(awaitedUsers);
  }
  getUsers();

  function openChannel(otherUser) {
    const channel = client.channel('messaging', {
      members: [id, otherUser],
      created_by_id: id,
    });
    channel.create();
  }

  if (!clientReady) return null;

  function userList() {
    return users.current.map((user) => (
      <div id="e1" className="chatUser">
        <p onClick={() => openChannel(user.username)} className="link2">{user.username}</p>
      </div>
    ));
  }
  if (home.current) { // Login Page
    return (
      <div>
        <Main username={username} messageIconProp={messageIconProp} />
      </div>
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

  return (
    <div>
      <div className="banner">
        <a onClick={() => goHome()} className="text">Home</a>
        <img href="/" src={messageIconProp} id="icon" alt="messages icon" onClick={() => handleChat()} />
        <img href="/" src={settings} id="icon" alt="settings icon" onClick={() => handleAnalytics()} />
        <a onClick={() => logOut()} id="logout">Logout</a>
      </div>
      <Chat client={client}>
        <div className="friendsContainer">
          <div className="friendsText">
            CHOOSE A USER FROM THE LIST TO CHAT
          </div>
          <div className="chatScroll">
            {userList()}
          </div>
        </div>
        <ChannelList filters={filters} sort={sort} options={options} />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default ChatPage;
