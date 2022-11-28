/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-relative-packages */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
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
import Main from './Main';
import '@stream-io/stream-chat-css/dist/css/index.css';
import messages from '../assets/messages.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendlist: {
    // alignItems: 'center',
    height: '100px',
    flex: 1,
  },
  friendstext: {
    flex: 1,
    fontSize: '30px',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  friends: {
    flex: 1,
    fontSize: '15px',
    color: 'blue',
    // borderColor: 'black',
    // borderWidth: '1px',
  },
  friendContainer: {
    borderWidth: '1px',
    borderColor: 'black',
    width: '80%',
    textAlign: 'center',
    paddingBottom: '3px',
    paddingTop: '3px',
    borderRadius: 5,
  },
  banner: {
    backgroundColor: '#C4C4C4',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
  },

  text: {
    textAlign: 'left',
    fontWeight: 500,
    fontSize: 20,
    color: 'inherit',
    textDecoration: 'inherit',
    paddingTop: 5,
    paddingRight: 0,
    paddingLeft: 10,
    paddingBottom: 5,
    flex: 3,
  },
  icon: {
    textAlign: 'right',
    flex: 1,
    padding: 17,
    marginRight: 3,
    alignSelf: 'flex-end',
    cursor: 'pointer',
  },
});
function ChatPage({ username }) {
  console.log(username);
  const id = String(username);
  const filters = { type: 'messaging', members: { $in: [id] } };
  const options = { state: true, presence: true, limit: 10 };
  const sort = { last_message_at: -1 };
  const [clientReady, setClientReady] = useState(false);
  const [text, setText] = useState('');
  const api_key = '3wzm36fgv4zb';
  const users = useRef([]);
  const [, homeStarted] = useState(false); // state for game start
  const home = useRef(false); // ref for game start
  const [chat, setChat] = useState(false);
  // const api_secret = 'ewqrq442jdxrphdd5bz59a9u7k93gbxutncav3dfk3vs2xwbvg53xdy9tj2y25nj';
  const client = StreamChat.getInstance(api_key);
  useEffect(() => {
    async function getUsers() {
      const response = await fetch('http://localhost:8888/users/');
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const awaitedUsers = await response.json();
      users.current = awaitedUsers;
      console.log(awaitedUsers);
    }
    getUsers();

    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: id,
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
    const channel = client.channel('messaging', {
      members: [id, 'pointifybot'],
      created_by_id: id,
    });
    channel.create();
  }, []);

  const newChannel = (other) => {
    const otherUser = other;
    const channel = client.channel('messaging', {
      members: [id, otherUser],
      created_by_id: id,
    });
    channel.create();
  };
  function userList() {
    return users.current.map((user) => (
      <View style={styles.friendContainer}>
        <Text style={styles.friends} onPress={() => newChannel(user.username)}>{user.username}</Text>
      </View>
    ));
  }
  if (!clientReady) return null;

  function handleChat() {
    setChat(true);
  }

  function goHome() {
    home.current = true;
    homeStarted(true);
  }

  if (chat) {
    return (
      <ChatPage username={username} />
    );
  }

  if (home.current) { // Login Page
    return (
      <div>
        <Main username={username} />
      </div>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.text} onPress={goHome}>Home</Text>
        <TouchableOpacity onPress={handleChat}>
          <Image source={messages} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', width: '60%', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.friendstext}>
            CHOOSE A USER FROM THE LIST TO CHAT
          </Text>
        </View>
        <ScrollView style={styles.friendlist}>
          {userList()}
        </ScrollView>
      </View>
      <Chat client={client}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0, zIndex: 5 }}>
            <ChannelList filters={filters} sort={sort} options={options} />
          </View>
          <View style={{ flex: 1 }}>
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </View>
        </View>
      </Chat>
    </View>
  );
}

export default ChatPage;
