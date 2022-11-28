/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import { React, useState, useRef } from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet, Image,
} from 'react-native';
import messages from '../assets/messages.png';
import ChatPage from './Chat';
import Main from './Main';

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

  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
  },

  wrapper: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 30,
    paddingLeft: 12,
    paddingRight: 12,
  },

  eventText: {
    textAlign: 'center',
    fontSize: 17,
  },

  main: {
    flexDirection: 'column',
    display: 'flex',
    height: '100%',
  },

  descText: {
    fontSize: 17,
  },

  wrapperDesc: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 30,
    paddingLeft: 12,
    paddingRight: 12,
    flexGrow: 1,
    marginBottom: 30,
  },
});

function Event(props) {
  const [chat, setChat] = useState(false);
  const [, homeStarted] = useState(false); // state for game start
  const home = useRef(false); // ref for game start

  function goHome() {
    homeStarted(true);
    home.current = true;
  }

  function handleChat() {
    setChat(true);
  }

  if (chat) {
    return (
      <ChatPage username={props.user} />
    );
  }

  if (home.current) { // Login Page
    return (
      <div>
        <Main username={props.user} />
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
      <View style={styles.wrapper}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.eventText}>
          {props.date}
          &nbsp; | &nbsp;
          {props.time}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.eventText}>{props.location}</Text>
      </View>
      <View style={styles.wrapperDesc}>
        <Text style={styles.descText}>{props.desc}</Text>
      </View>
    </View>
  );
}

export default Event;
