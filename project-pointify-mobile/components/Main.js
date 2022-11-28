/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import {
  TouchableOpacity, View, Text, StyleSheet, Image, ScrollView,
} from 'react-native';
import {
  React, useState, useRef, useEffect,
} from 'react';
import { StreamChat } from 'stream-chat';
import ChatPage from './Chat';
import PostEvent from './PostEvent';
import Event from './Event';
import messages from '../assets/messages.png';

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#C4C4C4',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
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

  header: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: 45,
  },

  container: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
  },

  subheader: {
    fontSize: 17,
    marginTop: 20,
    marginBottom: 10,
  },

  event: {
    width: '97.5%',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
  },

  eventText: {
    fontSize: 20,
  },

  scroll: {
    height: 605,
  },

  button: {
    width: '40%',
    textAlign: 'center',
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: '6%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 9,
    paddingRight: 9,
    backgroundColor: 'white',
    fontSize: 19,
    fontFamily: 'Arial',
  },

});

export default function Main({ username }) {
  const [, setStarted1] = useState(false);
  const [, eventOpened] = useState(false);
  const [chat, setChat] = useState(false);
  const post = useRef(false);
  const opened = useRef(false);
  const eventOpenedIndex = useRef(0);
  const [records, setRecords] = useState([]);
  const [, homeStarted] = useState(false); // state for game start
  const home = useRef(false); // ref for game start

  const apiKey = '3wzm36fgv4zb';
  const client = StreamChat.getInstance(apiKey);
  const id = String(username);

  function goHome() {
    home.current = true;
    opened.current = false;
    homeStarted(true);
  }

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch('http://localhost:8888/record/');

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
  }, [records.length]);

  function handlePost() {
    setStarted1(true);
    post.current = true;
  }

  function handleChat() {
    setChat(true);
  }

  if (post.current) {
    return (
      <PostEvent username={username} />
    );
  }

  let info = {};
  function openEvent(index) {
    eventOpened(true);
    eventOpenedIndex.current = index;
    opened.current = true;
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record, index) => (
      <TouchableOpacity style={styles.event} onPress={() => openEvent(index)}>
        <Text style={styles.eventText}>{record.title}</Text>
      </TouchableOpacity>
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
    };
    return (
      <Event {...info} />
    );
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
    <View style={styles.main}>
      <View style={styles.banner}>
        <Text style={styles.text} onPress={goHome}>Home</Text>
        <TouchableOpacity onPress={handleChat}>
          <Image source={messages} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Pointify</Text>
      <View style={styles.container}>
        <Text style={styles.subheader}>Events Near You:</Text>
        <ScrollView style={styles.scroll}>
          {recordList()}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePost}>
        Post Your Event
      </TouchableOpacity>
    </View>
  );
}
