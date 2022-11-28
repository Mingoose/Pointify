/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-cycle */
import {
  React, useState, useRef,
} from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet, TextInput, Image, Alert,
} from 'react-native';
import Main from './Main';
import messages from '../assets/messages.png';
import ChatPage from './Chat';

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
    marginTop: 40,
    marginBottom: 10,
  },

  container: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
  },

  formDescriptor: {
    fontSize: 15,
    marginTop: 15,
  },

  textbox: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    width: '100%',
    marginTop: 5,
    paddingLeft: '3%',
    paddingRight: '3%',
  },

  largeTextbox: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 15,
    width: '100%',
    marginTop: 5,
    paddingLeft: '3%',
    paddingRight: '3%',
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
    marginBottom: 20,
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 9,
    paddingRight: 9,
    backgroundColor: 'white',
    fontSize: 19,
    fontFamily: 'Arial',
  },
});

function PostEvent(props) {
  const [chat, setChat] = useState(false);
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

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  const validateDate = (date) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(date);
  };

  const validateTime = (time) => {
    const regex = /^(0?[1-9]|1[0-2]):([0-5]\d)\s?((?:A|P)\.?M\.?)$/i;
    return regex.test(time);
  };

  const allFieldsRequired = (title, date, time, location, desc) => {
    const regex = /.{1,}/i;
    return regex.test(title) && regex.test(date) && regex.test(time)
    && regex.test(location) && regex.test(desc);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (!allFieldsRequired(form.title, form.date, form.time, form.location, form.desc)) {
      Alert.alert('All fields are required!');
      alert('All fields are required!');
    } else if (!(validateDate(form.date) && validateTime(form.time))) {
      Alert.alert('Error! date and/or time invalid');
      alert('Error! date and/or time invalid');
    } else {
      const newEvent = { ...form };
      await fetch('http://localhost:8888/record/add', {
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
    }
  };

  if (post.current) { // Login Page
    return (
      <Main />
    );
  }

  if (home.current) { // Login Page
    return (
      <div>
        <Main username={props.username} />
      </div>
    );
  }

  if (chat) {
    return (
      <ChatPage username={props.username} />
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
      <Text style={styles.header}>Post An Event</Text>
      <View style={styles.container}>
        <Text style={styles.formDescriptor}>Event Title</Text>
        <TextInput placeholder="FREE BOBA" style={styles.textbox} onChange={(e) => updateForm({ title: e.target.value })} value={form.title} />
        <Text style={styles.formDescriptor}>Date</Text>
        <TextInput placeholder="2021-12-22" style={styles.textbox} onChange={(e) => updateForm({ date: e.target.value })} value={form.date} />
        <Text style={styles.formDescriptor}>Time</Text>
        <TextInput placeholder="05:15 AM" style={styles.textbox} onChange={(e) => updateForm({ time: e.target.value })} value={form.time} />
        <Text style={styles.formDescriptor}>Location</Text>
        <TextInput placeholder="Harnwell College House" style={styles.textbox} onChange={(e) => updateForm({ location: e.target.value })} value={form.location} />
        <Text style={styles.formDescriptor}>Description</Text>
        <TextInput placeholder="FREE BOBA" style={styles.largeTextbox} multiline numberOfLines={11} onChange={(e) => updateForm({ desc: e.target.value })} value={form.desc} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePost}>
        Post Your Event
      </TouchableOpacity>
    </View>
  );
}

export default PostEvent;
